package edu.sjsu.cmpe275.controller;

import edu.sjsu.cmpe275.model.Clinic;
import edu.sjsu.cmpe275.repository.ClinicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.List;

@RestController
public class ClinicController {

    @Autowired
    private ClinicRepository clinicRepository;

    @GetMapping(value = "/clinic", produces = {"application/json"})
    public List<Clinic> getClinics() {
        return clinicRepository.findAll();
    }

    @PostMapping(value = "/clinic/create", produces = {"application/json"})
    @Transactional
    public ResponseEntity<?> createClinic(@RequestBody Clinic clinic) throws ParseException {
        Clinic clinicResponse = clinicRepository.save(clinic);
        return ResponseEntity.ok(clinicResponse);
    }
}
