package edu.sjsu.cmpe275.controller;

import edu.sjsu.cmpe275.common.Error;
import edu.sjsu.cmpe275.model.Appointment;
import edu.sjsu.cmpe275.model.User;
import edu.sjsu.cmpe275.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.*;
import java.util.stream.Collectors;

import static edu.sjsu.cmpe275.common.DateUtil.parseDateTime;

@RestController
public class UserController {
    @Autowired
    UserRepository userRepository;
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
        String[] email = user.getEmail().split("@");
        if (email[1].equalsIgnoreCase("sjsu.edu")) {
            user.setAdmin(true);
        } else {
            user.setAdmin(false);
        }
        User passenger1 = userRepository.save(user);
        System.out.println("Returning " + passenger1);
        return ResponseEntity.ok(passenger1);
    }

    @GetMapping(value = "/user/{emailId}/{fromDate}/{toDate}", produces = {"application/json"})
    public ResponseEntity<?> getUserReport(@PathVariable("emailId") String email, @PathVariable("fromDate") String fromDate, @PathVariable("toDate") String toDate, @RequestParam("time") String currentTime) {
        Optional<User> userOpt = userRepository.findUserByEmail(email);
        if (userOpt.isEmpty()) {
            return Error.badRequest(HttpStatus.BAD_REQUEST, "Invalid user ID ", email);
        }
        User user = userOpt.get();
        List<Appointment> appointments = user.getAppointments();
        Map<String, Object> responseMap = new HashMap<>();
        Date currentTimeDate = parseDateTime(currentTime);
        Date from = parseDateTime(fromDate);
        Date to = parseDateTime(toDate);
        List<Appointment> appointmentsFiltered = appointments.stream().filter(appt -> appt.getTime().getTime() >= from.getTime() && appt.getTime().getTime() < to.getTime()).collect(Collectors.toList());
        int noShow = 0;
        float rate = 0;
        for (Appointment appt : appointmentsFiltered) {
            boolean checkinStatus = appt.isCheckInStatus();
            if (!checkinStatus && appt.getTime().getTime() < currentTimeDate.getTime()) {
                noShow++;
            }
        }
        if (!appointmentsFiltered.isEmpty()) {
            rate =(float) noShow / appointmentsFiltered.size();
        }
        responseMap.put("total", appointmentsFiltered.size());
        responseMap.put("noShow", noShow);
        responseMap.put("rate", rate);

        return ResponseEntity.ok(responseMap);
    }
}
