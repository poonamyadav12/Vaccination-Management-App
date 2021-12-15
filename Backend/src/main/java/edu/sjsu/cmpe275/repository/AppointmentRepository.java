package edu.sjsu.cmpe275.repository;

import edu.sjsu.cmpe275.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE appointment SET time = ?2 WHERE id = ?1", nativeQuery = true)
    Optional<Integer> updateAppointment(Long appointmentId, Date updatedTime);
}
