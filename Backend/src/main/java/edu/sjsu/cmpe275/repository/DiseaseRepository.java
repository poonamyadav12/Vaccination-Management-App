package edu.sjsu.cmpe275.repository;

import edu.sjsu.cmpe275.model.Disease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DiseaseRepository extends JpaRepository<Disease, String> {
    Optional<Disease> findDiseaseByName(String name);
}
