package edu.sjsu.cmpe275.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.checkerframework.common.aliasing.qual.Unique;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Entity
public class User {
    @Id
    @SequenceGenerator(name = "MRNGenerator", sequenceName= "MRNSequence", initialValue = 100, allocationSize = 10)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MRNGenerator")
    private int medicalRecordNumber;
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

    public int getMedicalRecordNumber() {
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
}
