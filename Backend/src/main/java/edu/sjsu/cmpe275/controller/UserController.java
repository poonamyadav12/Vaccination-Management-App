package edu.sjsu.cmpe275.controller;

import edu.sjsu.cmpe275.common.Error;
import edu.sjsu.cmpe275.model.User;
import edu.sjsu.cmpe275.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    UserRepository userRepository;

    //Fetch user details using the ID(MRN)
    /*@GetMapping(value = "/user/{id}", produces = {"application/json"})
    public ResponseEntity<?> getUserById(@PathVariable("id") String id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            return ResponseEntity.of(userOptional);
        }

        return Error.badRequest(HttpStatus.NOT_FOUND, "Sorry, the requested User with ID %s does not exist", id);
    }*/

    //Fetch user details using email
    @GetMapping(value = "/user/{email}", produces = {"application/json"})
    public ResponseEntity<?> getUserByEmail(@PathVariable("email") String email) {
        Optional<User> userOptional = userRepository.findUserByEmail(email);
        if (userOptional.isPresent()) {
            return ResponseEntity.of(userOptional);
        }

        return Error.badRequest(HttpStatus.NOT_FOUND, "Sorry, the requested User with email %s does not exist", email);
    }

    @PostMapping(value = "/user", produces = {"application/json"})
    @Transactional
    public ResponseEntity<?> createUser(@RequestBody User user) throws ParseException {
        System.out.println("Coming here" + user.getEmail());
//        try {
        User passenger1 = userRepository.save(user);
        System.out.println("Returning " + passenger1);
        return ResponseEntity.ok(passenger1);
//        }catch (Exception e){
//            System.out.println("Error occurred"+e.getCause());
//            return Error.badRequest(HttpStatus.BAD_REQUEST,"Something went wrong");
//        }
    }

}
