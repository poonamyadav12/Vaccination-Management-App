package edu.sjsu.cmpe275.common;

import edu.sjsu.cmpe275.model.TimeOfDay;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;
import java.util.concurrent.TimeUnit;

public class DateUtil {

    private static final String LOS_ANGELES_TIMEZONE = "America/Los_Angeles";

    public static Date parseDateTime(String date) {
        SimpleDateFormat jsfmt = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US);
        jsfmt.setTimeZone(TimeZone.getTimeZone("UTC"));
        try {
            return jsfmt.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return new Date();
    }

    public static String formatDateTime(Date date) {
        SimpleDateFormat jsfmt = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ", Locale.US);
        jsfmt.setTimeZone(TimeZone.getTimeZone(LOS_ANGELES_TIMEZONE));
        return jsfmt.format(date);
    }

    public static Date parseDate(String date) {
        SimpleDateFormat jsfmt = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
        jsfmt.setTimeZone(TimeZone.getTimeZone(LOS_ANGELES_TIMEZONE));
        try {
            return jsfmt.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return new Date();
    }

    public static TimeOfDay getTimeOfDay(String currentTime) {
        Date date = parseDateTime(currentTime);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.setTimeZone(TimeZone.getTimeZone(LOS_ANGELES_TIMEZONE));
        int hourOfDay = calendar.get(Calendar.HOUR_OF_DAY);
        int minute = calendar.get(Calendar.MINUTE);
        return new TimeOfDay(hourOfDay, minute);
    }

    public static long durationDays(Date date1, Date date2) {
        long diffInMillis = Math.abs(date2.getTime() - date1.getTime());
        return TimeUnit.DAYS.convert(diffInMillis, TimeUnit.MILLISECONDS);
    }

    public static Date atStartOfDay(Date date) {
        LocalDateTime localDateTime = dateToLocalDateTime(date);
        LocalDateTime startOfDay = localDateTime.with(LocalTime.MIN);
        return localDateTimeToDate(startOfDay);
    }

    public static Date addMinutes(Date date, int minutes) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.setTimeZone(TimeZone.getTimeZone(LOS_ANGELES_TIMEZONE));
        c.add(Calendar.MINUTE, minutes);
        return c.getTime();
    }

    private static LocalDateTime dateToLocalDateTime(Date date) {
        return LocalDateTime.ofInstant(date.toInstant(), ZoneId.of(LOS_ANGELES_TIMEZONE));
    }

    private static Date localDateTimeToDate(LocalDateTime localDateTime) {
        return Date.from(localDateTime.atZone(ZoneId.of(LOS_ANGELES_TIMEZONE)).toInstant());
    }

    private DateUtil() {
    }

}
