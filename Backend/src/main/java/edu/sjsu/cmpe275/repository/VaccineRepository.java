package edu.sjsu.cmpe275.repository;

import edu.sjsu.cmpe275.model.Vaccine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VaccineRepository extends JpaRepository<Vaccine, String> {
    Optional<Vaccine> findVaccineByName(String name);
}
