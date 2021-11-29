package edu.sjsu.cmpe275.repository;

import edu.sjsu.cmpe275.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {


}
