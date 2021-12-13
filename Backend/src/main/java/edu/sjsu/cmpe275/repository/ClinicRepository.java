package edu.sjsu.cmpe275.repository;

import edu.sjsu.cmpe275.model.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClinicRepository extends JpaRepository<Clinic, String> {
    @Query("select c from Clinic c where (c.openTime.hour > ?1 or (c.openTime.hour = ?1 and c.openTime.minute > ?2)) and (c.closeTime.hour < ?1 or (c.closeTime.hour = ?1 and c.closeTime.minute < ?2))")
    List<Clinic> findClinicsWithinTimeRange(int hour, int minute);
}
