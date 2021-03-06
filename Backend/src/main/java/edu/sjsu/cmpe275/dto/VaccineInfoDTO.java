package edu.sjsu.cmpe275.dto;

import edu.sjsu.cmpe275.model.Appointment;

import java.util.ArrayList;
import java.util.List;

public class VaccineInfoDTO {

    List<VaccineInfo> upcomingVaccines;

    List<VaccineInfo> pastVaccines;

    public VaccineInfoDTO() {
        this.upcomingVaccines = new ArrayList<>();
        this.pastVaccines = new ArrayList<>();
    }

    public List<VaccineInfo> getUpcomingVaccines() {
        return upcomingVaccines;
    }

    public void setUpcomingVaccines(List<VaccineInfo> upcomingVaccines) {
        this.upcomingVaccines = upcomingVaccines;
    }

    public void addUpcomingVaccine(VaccineInfo upcomingVaccine) {
        this.upcomingVaccines.add(upcomingVaccine);
    }

    public List<VaccineInfo> getPastVaccines() {
        return pastVaccines;
    }

    public void setPastVaccines(List<VaccineInfo> pastVaccines) {
        this.pastVaccines = pastVaccines;
    }

    public void addPastVaccine(VaccineInfo pastVaccine) {
        this.pastVaccines.add(pastVaccine);
    }

    public void sortEntries() {
        sortEntries(this.pastVaccines, -1);
        sortEntries(this.upcomingVaccines, 1);
    }

    public void sortEntries(List<VaccineInfo> vaccineInfos, int sortOrder) {
        vaccineInfos.sort((c1, c2) -> {
            if (!c1.getAppointments().isEmpty() && !c2.getAppointments().isEmpty()) {
                return sortOrder * Long.compare(c1.getAppointments().get(0).getTime().getTime(), c2.getAppointments().get(0).getTime().getTime());
            }
            if (c1.getAppointments().isEmpty()) {
                return 1;
            }
            return -1;
        });
    }

    public static class VaccineInfo {

        private List<Appointment> appointments;
        private String vaccineName;
        private int shotsDue;

        public VaccineInfo(List<Appointment> appointments, String vaccineName, int shotsDue) {
            this.appointments = appointments;
            this.vaccineName = vaccineName;
            this.shotsDue = shotsDue;
        }

        public VaccineInfo() {
            this.appointments = new ArrayList<>();
        }

        public List<Appointment> getAppointments() {
            return appointments;
        }

        public void setAppointments(List<Appointment> appointments) {
            this.appointments = appointments;
        }

        public void addAppointment(Appointment appointment) {
            this.appointments.add(appointment);
        }

        public String getVaccineName() {
            return vaccineName;
        }

        public void setVaccineName(String vaccineName) {
            this.vaccineName = vaccineName;
        }

        public int getShotsDue() {
            return shotsDue;
        }

        public void setShotsDue(int shotsDue) {
            this.shotsDue = shotsDue;
        }
    }
}
