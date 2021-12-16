package edu.sjsu.cmpe275.controller;

import edu.sjsu.cmpe275.common.Error;
import edu.sjsu.cmpe275.model.Disease;
import edu.sjsu.cmpe275.repository.DiseaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class DiseaseController {
    private final DiseaseRepository diseaseRepository;

    @Autowired
    public DiseaseController(DiseaseRepository diseaseRepository) {
        this.diseaseRepository = diseaseRepository;
    }

    @GetMapping(value = "/disease", produces = {"application/json"})
    public List<Disease> getDisease() {
        return diseaseRepository.findAll();
    }

    @PostMapping(value = "/disease", produces = {"application/json"})
    @Transactional
    public ResponseEntity<?> registerDisease(@RequestBody Disease disease) {
        Optional<Disease> diseaseOptional = diseaseRepository.findDiseaseByName(disease.getName());

        if (diseaseOptional.isPresent()) {
            return Error.badRequest(HttpStatus.BAD_REQUEST, "Disease Already Exist In Database");
        }

        diseaseRepository.save(disease);
        return ResponseEntity.ok("Success");
    }
}
