package edu.sjsu.cmpe275.controller;

import edu.sjsu.cmpe275.common.Error;
import edu.sjsu.cmpe275.dto.VaccineDTO;
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
    public ResponseEntity<?> getDueVaccine(@PathVariable String emailId) {
        Optional<User> userOpt = userRepository.findUserByEmail(emailId);
        if (userOpt.isEmpty()) {
            return Error.badRequest(HttpStatus.BAD_REQUEST, "Invalid user ID ", emailId);
        }
        User user = userOpt.get();
        Map<String, Long> alreadyTakenVaccines = user.getAppointments()
                .stream().flatMap(appt -> appt.getVaccines().stream())
                .collect(Collectors.groupingBy(Vaccine::getVaccineId, Collectors.counting()));
        List<Vaccine> allVaccines = vaccineRepository.findAll();
        List<Vaccine> dueVaccines = allVaccines.stream()
                .filter(vaccine ->
                        alreadyTakenVaccines.getOrDefault(vaccine.getVaccineId(), 0L) < vaccine.getNumberOfShots())
                .collect(Collectors.toList());
        return ResponseEntity.ok(dueVaccines);
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
