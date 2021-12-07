package edu.sjsu.cmpe275.controller;

import edu.sjsu.cmpe275.dto.VaccineDTO;
import edu.sjsu.cmpe275.model.Disease;
import edu.sjsu.cmpe275.model.Vaccine;
import edu.sjsu.cmpe275.repository.DiseaseRepository;
import edu.sjsu.cmpe275.repository.VaccineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
public class VaccineController {
    private final VaccineRepository vaccineRepository;
    private final DiseaseRepository diseaseRepository;

    @Autowired
    public VaccineController(VaccineRepository vaccineRepository, DiseaseRepository diseaseRepository) {
        this.vaccineRepository = vaccineRepository;
        this.diseaseRepository = diseaseRepository;
    }

    @GetMapping(value = "/vaccine", produces = {"application/json"})
    public List<Vaccine> getVaccine() {
        return vaccineRepository.findAll();
    }

    @PostMapping(value="/vaccine", produces = {"application/json"})
    public void registerVaccine(@RequestBody VaccineDTO vaccineDTO) {
        // Getting The Disease Objects
        Set<String> diseasesIds = vaccineDTO.getDiseasesIds();
        Set<Disease> diseases = new HashSet<>();

        for(String id : diseasesIds) {
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
