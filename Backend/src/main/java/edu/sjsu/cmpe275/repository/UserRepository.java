package edu.sjsu.cmpe275.repository;

import edu.sjsu.cmpe275.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT s from User s WHERE s.email = ?1")
    Optional<User> findUserByEmail(String email);

}
