package edu.sjsu.cmpe275.model;

import javax.persistence.*;

@Entity
public class Clinic {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true)
    private String name;
    private int numberOfPhysicians;
    @Embedded
    private Address address;
    @Embedded
    @AttributeOverride(name = "hour", column = @Column(name = "open_hour"))
    @AttributeOverride(name = "minute", column = @Column(name = "open_minute"))
    private TimeOfDay openTime;
    @Embedded
    @AttributeOverride(name = "hour", column = @Column(name = "close_hour"))
    @AttributeOverride(name = "minute", column = @Column(name = "close_minute"))
    private TimeOfDay closeTime;

    public Clinic(String name, int numberOfPhysicians, Address address, TimeOfDay openTime, TimeOfDay closeTime) {
        this.name = name;
        this.numberOfPhysicians = numberOfPhysicians;
        this.address = address;
        this.openTime = openTime;
        this.closeTime = closeTime;
    }

    public Clinic() {

    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNumberOfPhysicians() {
        return numberOfPhysicians;
    }

    public void setNumberOfPhysicians(int numberOfPhysicians) {
        this.numberOfPhysicians = numberOfPhysicians;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public TimeOfDay getOpenTime() {
        return openTime;
    }

    public void setOpenTime(TimeOfDay openTime) {
        this.openTime = openTime;
    }

    public TimeOfDay getCloseTime() {
        return closeTime;
    }

    public void setCloseTime(TimeOfDay closeTime) {
        this.closeTime = closeTime;
    }

    @Override
    public String toString() {
        return "Clinic{" +
                "name='" + name + '\'' +
                ", numberOfPhysicians=" + numberOfPhysicians +
                ", address=" + address +
                ", openTime=" + openTime +
                ", closeTime=" + closeTime +
                '}';
    }
}
