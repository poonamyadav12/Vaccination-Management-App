package edu.sjsu.cmpe275.controller;

import edu.sjsu.cmpe275.common.DateUtil;
import edu.sjsu.cmpe275.common.Error;
import edu.sjsu.cmpe275.dto.AppointmentOptions;
import edu.sjsu.cmpe275.model.*;
import edu.sjsu.cmpe275.repository.AppointmentRepository;
import edu.sjsu.cmpe275.repository.ClinicRepository;
import edu.sjsu.cmpe275.repository.UserRepository;
import edu.sjsu.cmpe275.repository.VaccineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import static edu.sjsu.cmpe275.common.DateUtil.*;

@RestController
public class AppointmentController {

    @Autowired
    private ClinicRepository clinicRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    private VaccineRepository vaccineRepository;
    @Autowired
    private AppointmentRepository appointmentRepository;

    @GetMapping(value = "/appointmentSlots/{selectedDate}", produces = {"application/json"})
    ResponseEntity<?> getAppointmentSlots(@RequestParam("time") String currentTimeStr,
                                          @PathVariable("selectedDate") String selectedDateStr) {
        Date currentTimeDt = parseDateTime(currentTimeStr);
        Date selectedDate = parseDate(selectedDateStr);
        if (selectedDate.before(atStartOfDay(currentTimeDt))) {
            return ResponseEntity.ok(null);
        }
        if (DateUtil.durationDays(atStartOfDay(currentTimeDt), selectedDate) > 365) {
            return ResponseEntity.ok(null);
        }
        List<Clinic> clinics = clinicRepository.findAll();

        AppointmentOptions options = new AppointmentOptions();
        for (Clinic clinic : clinics) {
            List<Appointment> bookedAppointments = clinic.getAppointments();
            Map<Date, Long> appointmentsByTime = bookedAppointments.stream().collect(Collectors.groupingBy(Appointment::getTime, Collectors.counting()));
            AppointmentOptions.ClinicAppointment clinicAppointment = new AppointmentOptions.ClinicAppointment();
            clinicAppointment.setClinic(clinic);
            int startMinutes = clinic.getOpenTime().minuteOfDay();
            int closeMinutes = clinic.getCloseTime().minuteOfDay();
            // if selected date is current date then time will start
            if (selectedDate.equals(atStartOfDay(currentTimeDt))) {
                TimeOfDay timeOfDay = getTimeOfDay(currentTimeStr);
                startMinutes = timeOfDay.minuteOfDay();
            }

            AppointmentOptions.ClinicAppointment.Slot slot = new AppointmentOptions.ClinicAppointment.Slot();
            slot.setDate(selectedDateStr);
            // Create appointment slots at 15 minutes apart.
            for (int minute = (int) Math.ceil(startMinutes / 15.0) * 15; minute < closeMinutes; minute += 15) {
                Date date = addMinutes(selectedDate, minute);
                Long alreadyBooked = appointmentsByTime.getOrDefault(date, 0L);
                if (alreadyBooked < clinic.getNumberOfPhysicians()) {
                    slot.addTime(formatDateTime(date));
                }
            }
            clinicAppointment.addSlots(slot);
            options.addAppointment(clinicAppointment);
        }

        return ResponseEntity.ok(options);
    }

    @PostMapping(value = "appointment/create")
    @Transactional
    ResponseEntity<?> createAppointment(@RequestParam("userID") Long userID, @RequestParam("clinicID") Long clinicID, @RequestParam("bookingTime") String bookingTime, @RequestParam("vaccineID") String vaccineID) {
        Optional<User> userOpt = userRepository.findById(userID);
        if (userOpt.isEmpty()) {
            return Error.badRequest(HttpStatus.BAD_REQUEST, "User is not available");
        }
        Optional<Vaccine> vaccineOpt = vaccineRepository.findById(vaccineID);
        if (vaccineOpt.isEmpty()) {
            return Error.badRequest(HttpStatus.BAD_REQUEST, "Vaccine is not available");
        }
        Optional<Clinic> clinicOpt = clinicRepository.findById(clinicID);
        if (clinicOpt.isEmpty()) {
            return Error.badRequest(HttpStatus.BAD_REQUEST, "Clinic is not available");
        }
        Date bookingDateTime = parseDateTime(bookingTime);

        Appointment appointment = new Appointment(bookingDateTime, userOpt.get(), clinicOpt.get());
        appointment.addVaccine(vaccineOpt.get());
        appointmentRepository.save(appointment);
        return ResponseEntity.ok("Success");
    }

    @PostMapping(value = "appointment/delete")
    @Transactional
    ResponseEntity<?> deleteAppointment(@RequestParam("appointmentID") Long appointmentID) {

        System.out.println(appointmentID);
        boolean exists = appointmentRepository.existsById(appointmentID);
        if (!exists) {
            throw new IllegalStateException("Appointment ID doesn't exists " + appointmentID);
        }
        appointmentRepository.deleteById(appointmentID);

        return ResponseEntity.ok("Successfully Deleted Appointment");
    }


    @GetMapping(value = "/appointments/{emailId}", produces = {"application/json"})
    ResponseEntity<?> getAppointments(@PathVariable String emailId) {
        Optional<User> userOpt = userRepository.findUserByEmail(emailId);
        if (userOpt.isEmpty()) {
            return Error.badRequest(HttpStatus.BAD_REQUEST, "Invalid user ID");
        }
        return ResponseEntity.ok(userOpt.get().getAppointments());
    }

    @PostMapping(value = "appointment/checkin", produces = {"application/json"})
    ResponseEntity<?> checkInAppointment(@RequestParam("appointmentId") Long appointmentId, @RequestParam("time") String currentTimeStr) {
        Appointment appointment = appointmentRepository.findById(appointmentId).get();
        Date currentTime = parseDateTime(currentTimeStr);
        System.out.println("time " + currentTime);
        Date appointmentTime = appointment.getTime();
        System.out.println("Appointment time " + appointmentTime.getTime());
        long diffInMillies = appointmentTime.getTime() - currentTime.getTime();
        if (diffInMillies < 0) {
            return Error.badRequest(HttpStatus.BAD_REQUEST, "Already in past");
        }
        long diff = TimeUnit.HOURS.convert(diffInMillies, TimeUnit.MILLISECONDS);
        System.out.println("diff" + diff);
        if (appointment.isCheckInStatus()) {
            return Error.badRequest(HttpStatus.BAD_REQUEST, "Already Checked In");
        }
        appointment.setCheckInStatus(true);
        appointmentRepository.save(appointment);
        return ResponseEntity.ok("Checked In");
    }
}
