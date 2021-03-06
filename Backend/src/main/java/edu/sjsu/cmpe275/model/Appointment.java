package edu.sjsu.cmpe275.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Appointment implements Comparable<Appointment> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    private Date time;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicalRecordNumber")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "clinicId")
    private Clinic clinic;

    @ManyToMany
    @JoinTable(name = "appointment_vaccines",
            joinColumns = @JoinColumn(name = "id"),
            inverseJoinColumns = @JoinColumn(name = "vaccineId"))
    private List<Vaccine> vaccines;

    @Column(columnDefinition = "boolean default false", nullable = true)
    private boolean checkInStatus;

    public Appointment(Date time, User user, Clinic clinic) {
        this.time = time;
        this.user = user;
        this.clinic = clinic;
        this.vaccines = new ArrayList<>();
    }

    public Appointment() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Clinic getClinic() {
        return clinic;
    }

    public void setClinic(Clinic clinic) {
        this.clinic = clinic;
    }

    public List<Vaccine> getVaccines() {
        return vaccines;
    }

    public void setVaccines(List<Vaccine> vaccines) {
        this.vaccines = vaccines;
    }

    public void addVaccine(Vaccine vaccine) {
        this.vaccines.add(vaccine);
    }

    public boolean isCheckInStatus() {
        return checkInStatus;
    }

    public void setCheckInStatus(boolean checkInStatus) {
        this.checkInStatus = checkInStatus;
    }

    @Override
    public int compareTo(Appointment o) {
        if (o.getTime().equals(this.getTime())) return 0;
        return o.getTime().getTime() - this.getTime().getTime() < 0 ? 1 : -1;
    }
}
