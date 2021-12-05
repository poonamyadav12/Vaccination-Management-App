package edu.sjsu.cmpe275.controller;

import edu.sjsu.cmpe275.model.Clinic;
import edu.sjsu.cmpe275.repository.ClinicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
public class ClinicController {

    @Autowired
    private ClinicRepository clinicRepository;

    @PostMapping(value = "/clinic/create", produces = {"application/json"})
    @Transactional
    public ResponseEntity<?> createClinic(@RequestBody Clinic clinic) throws ParseException {
        Clinic clinicResponse = clinicRepository.save(clinic);
        return ResponseEntity.ok(clinicResponse);
    }
}
