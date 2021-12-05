package edu.sjsu.cmpe275.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class TimeOfDay implements Serializable {
    int hour;
    int minute;

    public TimeOfDay() {

    }

    public TimeOfDay(int hour, int minute) {
        this.hour = hour;
        this.minute = minute;
    }

    public int getHour() {
        return hour;
    }

    public int getMinute() {
        return minute;
    }

    public void setHour(int hour) {
        this.hour = hour;
    }

    public void setMinute(int minute) {
        this.minute = minute;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TimeOfDay)) return false;
        TimeOfDay timeOfDay = (TimeOfDay) o;
        return getHour() == timeOfDay.getHour() && getMinute() == timeOfDay.getMinute();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getHour(), getMinute());
    }
}
