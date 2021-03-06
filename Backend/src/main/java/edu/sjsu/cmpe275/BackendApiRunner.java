package edu.sjsu.cmpe275;

import edu.sjsu.cmpe275.model.Clinic;
import edu.sjsu.cmpe275.model.User;
import edu.sjsu.cmpe275.repository.ClinicRepository;
import edu.sjsu.cmpe275.repository.UserRepository;
import edu.sjsu.cmpe275.repository.VaccineRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApiRunner {
    private static final Logger log = LoggerFactory.getLogger(BackendApiRunner.class);

    public static void main(String[] args) {
        SpringApplication.run(BackendApiRunner.class, args);
    }

    @Bean
    public CommandLineRunner demo(UserRepository repository) {
        return (args) -> {
            // save a few user
//            repository.save(new User("ujjwal.jain@sjsu.edu", "ujjwal", "","jain", "12-10-1998", "male", new Address("xyz","","San Jose","CA","95121")));
//            repository.save(new User("poonam.yadav@sjsu.edu", "poonam", "","yadav", "12-07-2021", "female", new Address("abc","","San Jose","CA","95109")));
//            repository.save(new User("shubham.dutta@sjsu.edu", "Shubham", "","Dutta", "01-01-1996", "male", new Address("xyz","","San Jose","CA","95121")));
//            repository.save(new Passenger("Chloe", "O'Brian"));
//            repository.save(new Passenger("Kim", "Bauer"));
//            repository.save(new Passenger("David", "Palmer"));
//            repository.save(new Passenger("Michelle", "Dessler")); int age, String gender, String phone
            // repository.save(new Passenger("Daisy", "Palmer", 28, "Female", "9089877978990"));

            //save some reservations
            //String reservationNumber, String origin, String destination, int price

            // fetch all customers
            log.info("Users found with findAll():");
            log.info("-------------------------------");
            for (User customer : repository.findAll()) {
//                repository.delete(customer);
                log.info(customer.toString());
            }
            log.info("");
        };
    }

    @Bean
    public CommandLineRunner demo2(ClinicRepository repository) {
        return (args) -> {
            // save a few user
            //repository.save(new User("poonam.yadav@sjsu.edu", "Bauer", "hkoj", "daisy"));
//            repository.save(new Passenger("Chloe", "O'Brian"));
//            repository.save(new Passenger("Kim", "Bauer"));
//            repository.save(new Passenger("David", "Palmer"));
//            repository.save(new Passenger("Michelle", "Dessler")); int age, String gender, String phone
            // repository.save(new Passenger("Daisy", "Palmer", 28, "Female", "9089877978990"));

            //save some reservations
            //String reservationNumber, String origin, String destination, int price

            // fetch all customers
            log.info("Clinic found with findAll():");
            log.info("-------------------------------");
            for (Clinic clinic : repository.findAll()) {
//                repository.delete(customer);
                log.info(clinic.toString());
            }
            log.info("");
        };
    }

    @Bean
    public CommandLineRunner demo3(VaccineRepository repository) {
        return (args) -> {
            // save a few customers=

            //repository.save(new Reservation("4028d6fd7cdd25b2017cdd25b8120000","re2342345","SJC", "SFO", 123));
            //save some reservations
            //String reservationNumber, String origin, String destination, int price
            // fetch all customers
            log.info("Vaccine found with findAll():");
            log.info("-------------------------------");
//            for (Vaccine customer : repository.findAll()) {
//                //repository.delete(customer);
//                log.info(customer.toString());
//            }
            log.info("");
        };
    }
//
//    @Bean
//    public CommandLineRunner flightTester(FlightRepository repository) throws ParseException {
//        return (args) -> {
//            // create and save a new flight
////            Date depart = new SimpleDateFormat("yyyy-MM-dd-HH").parse("2021-11-1-12");
////            Date arrive = new SimpleDateFormat("yyyy-MM-dd-HH").parse("2021-11-3-12");
////            repository.save(new Flight("flight1",
////                    200,
////                    "SFO",
////                    "DEL",
////                    20,
////                    depart,
////                    arrive,
////                    "First flight from SFO to DEL"
////            ));
//            log.info("Flights found with findAll()");
//            log.info("-------------------------------");
//            for (Flight flight : repository.findAll()) {
//                log.info(flight.toString());
//            }
//        };
//    }

}

