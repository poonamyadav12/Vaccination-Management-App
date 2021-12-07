package edu.sjsu.cmpe275.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.checkerframework.common.aliasing.qual.Unique;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Disease {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String diseaseId;

    @NotBlank(message = "Please Enter Disease Name")
    @Unique
    private String name;

    private String description;

    @JsonIgnore
    @ManyToMany(mappedBy = "diseases")
    private Set<Vaccine> vaccines;

    public Disease() {
    }

    public Disease(String diseaseId, @Unique String name, String description, Set<Vaccine> vaccines) {
        this.diseaseId = diseaseId;
        this.name = name;
        this.description = description;
        this.vaccines = vaccines;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDiseaseId() {
        return diseaseId;
    }

    public void setDiseaseId(String diseaseId) {
        this.diseaseId = diseaseId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Vaccine> getVaccines() {
        return vaccines;
    }

    public void setVaccines(Set<Vaccine> vaccines) {
        this.vaccines = vaccines;
    }

    @Override
    public String toString() {
        return "Disease{" +
                "diseaseId='" + diseaseId + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", vaccines=" + vaccines +
                '}';
    }
}
