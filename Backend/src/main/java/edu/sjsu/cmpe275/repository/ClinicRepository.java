package edu.sjsu.cmpe275.repository;

import edu.sjsu.cmpe275.model.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClinicRepository extends JpaRepository<Clinic,String> {

}
