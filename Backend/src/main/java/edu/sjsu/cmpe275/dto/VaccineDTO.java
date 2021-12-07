package edu.sjsu.cmpe275.dto;

import edu.sjsu.cmpe275.model.Disease;

import java.util.HashSet;
import java.util.Set;

public class VaccineDTO {
    private String name;
    private Set<String> diseasesIds;
    private String manufacturer;
    private Integer numberOfShots;
    private Integer shotIntervalVal;
    private Integer duration;

    public VaccineDTO() {
    }

    public VaccineDTO(String name, Set<String> diseasesIds, String manufacturer, Integer numberOfShots, Integer shotIntervalVal, Integer duration) {
        this.name = name;
        this.diseasesIds = diseasesIds;
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

    public Set<String> getDiseasesIds() {
        return diseasesIds;
    }

    public void setDiseasesIds(Set<String> diseasesIds) {
        this.diseasesIds = diseasesIds;
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
        return "VaccineDTO{" +
                "name='" + name + '\'' +
                ", diseasesIds=" + diseasesIds +
                ", manufacturer='" + manufacturer + '\'' +
                ", numberOfShots=" + numberOfShots +
                ", shotIntervalVal=" + shotIntervalVal +
                ", duration=" + duration +
                '}';
    }
}
