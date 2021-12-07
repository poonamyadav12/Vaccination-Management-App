package edu.sjsu.cmpe275.model;

import org.checkerframework.common.aliasing.qual.Unique;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
public class Vaccine {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String vaccineId;

    @NotBlank(message = "Please Enter Vaccine Name")
    @Unique
    private String name;

    @ManyToMany
    @JoinTable(
            name = "vaccine_disease",
            joinColumns = {@JoinColumn(name = "vaccine_id", referencedColumnName = "vaccineId")},
            inverseJoinColumns = {@JoinColumn(name = "disease_id", referencedColumnName = "diseaseId")}
    )
    private Set<Disease> diseases;

    @NotBlank(message = "Please Enter Manufacturer Name")
    @Size(min = 3)
    private String manufacturer;

    @NotNull
    @Min(1)
    private Integer numberOfShots;

    private Integer shotIntervalVal;

    @NotNull
    private Integer duration;

    public Vaccine() {
    }

    public Vaccine(String vaccineId, @Unique String name, Set<Disease> diseases, String manufacturer, Integer numberOfShots, Integer shotIntervalVal, Integer duration) {
        this.vaccineId = vaccineId;
        this.name = name;
        this.diseases = diseases;
        this.manufacturer = manufacturer;
        this.numberOfShots = numberOfShots;
        this.shotIntervalVal = shotIntervalVal;
        this.duration = duration;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Disease> getDiseases() {
        return diseases;
    }

    public void setDiseases(Set<Disease> diseases) {
        this.diseases = diseases;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public Integer getNumberOfShots() {
        return numberOfShots;
    }

    public void setNumberOfShots(Integer numberOfShots) {
        this.numberOfShots = numberOfShots;
    }

    public Integer getShotIntervalVal() {
        return shotIntervalVal;
    }

    public void setShotIntervalVal(Integer shotIntervalVal) {
        this.shotIntervalVal = shotIntervalVal;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    @Override
    public String toString() {
        return "Vaccine{" +
                "vaccineId='" + vaccineId + '\'' +
                ", name='" + name + '\'' +
                ", diseases=" + diseases +
                ", manufacturer='" + manufacturer + '\'' +
                ", numberOfShots=" + numberOfShots +
                ", shotIntervalVal=" + shotIntervalVal +
                ", duration=" + duration +
                '}';
    }
}
