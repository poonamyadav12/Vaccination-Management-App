package edu.sjsu.cmpe275.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    private Date time;

    @ManyToOne
    private User user;

    @ManyToOne
    private Clinic clinic;

    @ManyToMany
    @JoinTable(name = "appointment_vaccines",
            joinColumns = @JoinColumn(name = "vaccineId"),
            inverseJoinColumns = @JoinColumn(name = "id"))
    private List<Vaccine> vaccines;

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

    public void addVaccine(Vaccine vaccine){
     this.vaccines.add(vaccine);
    }
}
