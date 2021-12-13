package edu.sjsu.cmpe275.dto;

import edu.sjsu.cmpe275.model.Clinic;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class AppointmentOptions {
    List<ClinicAppointment> appointments;

    public static class ClinicAppointment {
        private Clinic clinic;

        private List<Slot> slots;

        public static class Slot {
            private String date;

            private List<String> times;

            public Slot() {
                this.times = new ArrayList<>();
            }

            public Slot(String date, List<String> times) {
                this.date = date;
                this.times = times;
            }

            public String getDate() {
                return date;
            }

            public void setDate(String date) {
                this.date = date;
            }

            public List<String> getTimes() {
                return times;
            }

            public void setTimes(List<String> times) {
                this.times = times;
            }

            public void addTime(String time) {
                this.times.add(time);
            }
        }

        public ClinicAppointment() {
            this.slots = new ArrayList<>();
        }

        public ClinicAppointment(Clinic clinic, List<Slot> slots) {
            this.clinic = clinic;
            this.slots = slots;
        }

        public Clinic getClinic() {
            return clinic;
        }

        public void setClinic(Clinic clinic) {
            this.clinic = clinic;
        }

        public List<Slot> getSlots() {
            return slots;
        }

        public void setSlots(List<Slot> slots) {
            this.slots = slots;
        }

        public void addSlots(Slot slot) {
            this.slots.add(slot);
        }
    }

    public AppointmentOptions() {
        appointments = new ArrayList<>();
    }

    public List<ClinicAppointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<ClinicAppointment> appointments) {
        this.appointments = appointments;
    }

    public void addAppointment(ClinicAppointment appointment) {
        this.appointments.add(appointment);
    }
}
