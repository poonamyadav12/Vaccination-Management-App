package edu.sjsu.cmpe275.repository;

import edu.sjsu.cmpe275.model.Appointment;
import edu.sjsu.cmpe275.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Query("SELECT s from Appointment s WHERE s.clinic.name = ?1")
    List<Appointment> findAppointmentByClinicName(String clinicName);
}
