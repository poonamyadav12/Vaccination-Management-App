package edu.sjsu.cmpe275.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.List;

@Entity
public class User {
    @Id
    @SequenceGenerator(name = "MRNGenerator", sequenceName= "MRNSequence", initialValue = 100, allocationSize = 10)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MRNGenerator")
    private long medicalRecordNumber;

    @NotBlank(message = "Please enter email")
    @Email(message = "Please enter a valid email")
    @Column(unique = true)

    private String email;
    @NotBlank(message = "Please Enter First Name")

    private String firstname;

    private String middlename;
    @NotBlank(message = "Please Enter Last Name")

    private String lastname;

    @Pattern(regexp = "^(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])-[0-9]{4}$", message = "Date must be in the MM-dd-YYYY format")
    private String dateOfBirth;

    private String gender;

    @Embedded
    private Address address;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    @JsonIgnore
    private List<Appointment> appointments;


    public edu.sjsu.cmpe275.model.Address getAddress() {
        return address;
    }


    public User(String email, String firstname, String middlename, String lastname, String dateOfBirth, String gender, Address address) {
        this.email = email;
        this.firstname = firstname;
        this.middlename = middlename;
        this.lastname = lastname;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.address = address;
    }

    public User() {

    }

    public String getEmail() {
        return email;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getMiddlename() {
        return middlename;
    }

    public String getLastname() {
        return lastname;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setMiddlename(String middlename) {
        this.middlename = middlename;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public long getMedicalRecordNumber() {
        return medicalRecordNumber;
    }

    public String getGender() {
        return gender;
    }

    @Override
    public String toString() {
        return "User{" +
                "email='" + email + '\'' +
                ", firstname='" + firstname + '\'' +
                ", middlename='" + middlename + '\'' +
                ", lastname='" + lastname + '\'' +
                '}';
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }
}
