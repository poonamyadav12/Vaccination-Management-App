package edu.sjsu.cmpe275.controller;

import edu.sjsu.cmpe275.common.Error;
import edu.sjsu.cmpe275.dto.VaccineDTO;
import edu.sjsu.cmpe275.dto.VaccineInfoDTO;
import edu.sjsu.cmpe275.model.Appointment;
import edu.sjsu.cmpe275.model.Disease;
import edu.sjsu.cmpe275.model.User;
import edu.sjsu.cmpe275.model.Vaccine;
import edu.sjsu.cmpe275.repository.DiseaseRepository;
import edu.sjsu.cmpe275.repository.UserRepository;
import edu.sjsu.cmpe275.repository.VaccineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

import static edu.sjsu.cmpe275.common.DateUtil.atStartOfDay;
import static edu.sjsu.cmpe275.common.DateUtil.parseDateTime;

@RestController
public class VaccineController {
    private final VaccineRepository vaccineRepository;
    private final DiseaseRepository diseaseRepository;
    private final UserRepository userRepository;

    @Autowired
    public VaccineController(VaccineRepository vaccineRepository, DiseaseRepository diseaseRepository, UserRepository userRepository) {
        this.vaccineRepository = vaccineRepository;
        this.diseaseRepository = diseaseRepository;
        this.userRepository = userRepository;
    }

    @GetMapping(value = "/vaccine", produces = {"application/json"})
    public List<Vaccine> getVaccine() {
        return vaccineRepository.findAll();
    }

    @GetMapping(value = "/vaccine/due/{emailId}", produces = {"application/json"})
    public ResponseEntity<?> getDueVaccine(@PathVariable String emailId, @RequestParam("bookingDateTime") String bookingDateTimeStr, @RequestParam("time") String currentTimeStr) {
        Optional<User> userOpt = userRepository.findUserByEmail(emailId);
        if (userOpt.isEmpty()) {
            return Error.badRequest(HttpStatus.BAD_REQUEST, "Invalid user ID ", emailId);
        }
        User user = userOpt.get();
        List<Appointment> appointments = user.getAppointments();
        Date currentDateTime = parseDateTime(currentTimeStr);
        Map<String, Long> alreadyTakenVaccines = appointments
                .stream()
                .filter(appt -> {
                    // If appointment is in past and no show
                    if (appt.getTime().getTime() < currentDateTime.getTime()) {
                        return appt.isCheckInStatus();
                    }
                    return true;
                })
                .flatMap(appt -> appt.getVaccines().stream())
                .collect(Collectors.groupingBy(Vaccine::getVaccineId, Collectors.counting()));

        Map<String, Date> maxAppointmentTime = new HashMap<>();
        for (Appointment appointment : appointments) {
            for (Vaccine v : appointment.getVaccines()) {
                maxAppointmentTime.compute(v.getVaccineId(), (key, val) -> {
                    // If appointment is in past and not checked in, don't consider it.
                    if (appointment.getTime().getTime() < currentDateTime.getTime() && !appointment.isCheckInStatus()) {
                        return val == null ? new Date(0) : val;
                    }
                    if (val == null) return appointment.getTime();
                    if (val.getTime() > appointment.getTime().getTime()) {
                        return val;
                    }
                    return appointment.getTime();
                });
            }
        }

        Date bookingDateTime = parseDateTime(bookingDateTimeStr);
        List<Vaccine> allVaccines = vaccineRepository.findAll();
        List<Vaccine> dueVaccines = allVaccines.stream()
                .filter(vaccine -> {
                    // If the shots are due and interval between subsequent doses have elapsed.
                    return alreadyTakenVaccines.getOrDefault(vaccine.getVaccineId(), 0L) < vaccine.getNumberOfShots()
                            && (vaccine.getShotIntervalVal() == null || atStartOfDay(bookingDateTime).getTime() / 1000 - atStartOfDay(maxAppointmentTime.getOrDefault(vaccine.getVaccineId(), new Date(0))).getTime() / 1000 > vaccine.getShotIntervalVal() * 24 * 3600);
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(dueVaccines);
    }

    @GetMapping(value = "vaccine/allInfo/{emailId}", produces = {"application/json"})
    public ResponseEntity<?> getAllDueVaccinesInfo(@PathVariable("emailId") String emailId, @RequestParam("time") String currentTimeStr) {
        Date currentDateTime = parseDateTime(currentTimeStr);
        Optional<User> userOpt = userRepository.findUserByEmail(emailId);
        if (userOpt.isEmpty()) {
            return Error.badRequest(HttpStatus.BAD_REQUEST, "Invalid user ID ", emailId);
        }
        User user = userOpt.get();
        List<Appointment> appointments = user.getAppointments();
        List<Vaccine> allVaccines = vaccineRepository.findAll();

        Map<String, List<Appointment>> appointmentsByVaccineId = new HashMap<>();
        for (Appointment appt : appointments) {
            for (Vaccine vaccine : appt.getVaccines()) {
                if (!appointmentsByVaccineId.containsKey(vaccine.getVaccineId())) {
                    appointmentsByVaccineId.put(vaccine.getVaccineId(), new ArrayList<>());
                }
                appointmentsByVaccineId.get(vaccine.getVaccineId()).add(appt);
            }
        }

        VaccineInfoDTO dto = new VaccineInfoDTO();
        for (Vaccine v : allVaccines) {
            String id = v.getVaccineId();
            List<Appointment> vaccineAppointments = appointmentsByVaccineId.getOrDefault(id, new ArrayList<>());
            Collections.sort(vaccineAppointments);

            int alreadyTakeShots = 0;
            for (Appointment appointment : vaccineAppointments) {
                if (appointment.getTime().getTime() - currentDateTime.getTime() < 0 && appointment.isCheckInStatus()) {
                    alreadyTakeShots++;
                }
            }
            VaccineInfoDTO.VaccineInfo pastVaccineInfo = null;
            for (Appointment appointment : vaccineAppointments) {
                // Skip for the future appointments.
                if (appointment.getTime().getTime() - currentDateTime.getTime() >= 0) {
                    continue;
                }
                if (pastVaccineInfo == null) {
                    pastVaccineInfo = new VaccineInfoDTO.VaccineInfo();
                }
                pastVaccineInfo.setVaccineName(v.getName());
                pastVaccineInfo.setShotsDue(v.getNumberOfShots() - alreadyTakeShots);
                pastVaccineInfo.addAppointment(appointment);
            }

            VaccineInfoDTO.VaccineInfo futureVaccineInfo = null;
            for (Appointment appointment : vaccineAppointments) {
                // Skip for the past appointments.
                if (appointment.getTime().getTime() - currentDateTime.getTime() < 0) {
                    continue;
                }
                if (futureVaccineInfo == null) {
                    futureVaccineInfo = new VaccineInfoDTO.VaccineInfo();
                }
                futureVaccineInfo.setVaccineName(v.getName());
                futureVaccineInfo.setShotsDue(v.getNumberOfShots() - alreadyTakeShots);
                futureVaccineInfo.addAppointment(appointment);
            }

            if (pastVaccineInfo != null) {
                dto.addPastVaccine(pastVaccineInfo);
            }

            // If there is no future appointment schedules for the future.
            if (futureVaccineInfo == null) {
                // If some shots are still left, show in the vaccines due.
                if (alreadyTakeShots < v.getNumberOfShots()) {
                    futureVaccineInfo = new VaccineInfoDTO.VaccineInfo();
                    futureVaccineInfo.setShotsDue(v.getNumberOfShots() - alreadyTakeShots);
                    futureVaccineInfo.setVaccineName(v.getName());
                    dto.addUpcomingVaccine(futureVaccineInfo);
                }
            } else {
                dto.addUpcomingVaccine(futureVaccineInfo);
            }
        }

        dto.sortEntries();
        return ResponseEntity.ok(dto);
    }

    @PostMapping(value = "/vaccine", produces = {"application/json"})
    public void registerVaccine(@RequestBody VaccineDTO vaccineDTO) {
        // Getting The Disease Objects
        Set<String> diseasesIds = vaccineDTO.getDiseasesIds();
        Set<Disease> diseases = new HashSet<>();

        for (String id : diseasesIds) {
            Optional<Disease> diseaseOptional = diseaseRepository.findById(id);
            if (diseaseOptional.isPresent()) {
                Disease disease = diseaseOptional.get();
                diseases.add(disease);
            }
        }

        // Creating A Vaccine Object
        Vaccine vaccine = new Vaccine();
        vaccine.setName(vaccineDTO.getName());
        vaccine.setDiseases(diseases);
        vaccine.setManufacturer(vaccineDTO.getManufacturer());
        vaccine.setNumberOfShots(vaccineDTO.getNumberOfShots());
        vaccine.setShotIntervalVal(vaccineDTO.getShotIntervalVal());
        vaccine.setDuration(vaccineDTO.getDuration());
        vaccineRepository.save(vaccine);
    }
}
