package edu.sjsu.cmpe275.repository;

import edu.sjsu.cmpe275.model.Appointment;
import edu.sjsu.cmpe275.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Query("SELECT s from Appointment s WHERE s.clinic.name = ?1")
    List<Appointment> findAppointmentByClinicName(String clinicName);
}
