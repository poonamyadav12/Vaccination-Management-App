package edu.sjsu.cmpe275.controller;

import edu.sjsu.cmpe275.common.DateUtil;
import edu.sjsu.cmpe275.dto.AppointmentOptions;
import edu.sjsu.cmpe275.model.Clinic;
import edu.sjsu.cmpe275.model.TimeOfDay;
import edu.sjsu.cmpe275.repository.ClinicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static edu.sjsu.cmpe275.common.DateUtil.*;

@RestController
public class AppointmentController {

    @Autowired
    private ClinicRepository clinicRepository;

    @GetMapping(value = "/appointmentSlots/{selectedDate}", produces = {"application/json"})
    ResponseEntity<?> getAppointmentSlots(@RequestParam("time") String currentTimeStr,
                                          @PathVariable("selectedDate") String selectedDateStr) {
        Date currentTimeDt = parseDateTime(currentTimeStr);
        Date selectedDate = parseDate(selectedDateStr);
        if (selectedDate.before(atStartOfDay(currentTimeDt))) {
            return ResponseEntity.ok(null);
        }
        if (DateUtil.durationDays(atStartOfDay(currentTimeDt), selectedDate) > 365) {
            return ResponseEntity.ok(null);
        }
        List<Clinic> clinics = clinicRepository.findAll();

        AppointmentOptions options = new AppointmentOptions();
        for (Clinic clinic : clinics) {
            AppointmentOptions.ClinicAppointment clinicAppointment = new AppointmentOptions.ClinicAppointment();
            clinicAppointment.setClinic(clinic);
            int startMinutes = clinic.getOpenTime().minuteOfDay();
            int closeMinutes = clinic.getCloseTime().minuteOfDay();
            // if selected date is current date then time will start
            if (selectedDate.equals(atStartOfDay(currentTimeDt))) {
                TimeOfDay timeOfDay = getTimeOfDay(currentTimeStr);
                startMinutes = timeOfDay.minuteOfDay();
            }

            AppointmentOptions.ClinicAppointment.Slot slot = new AppointmentOptions.ClinicAppointment.Slot();
            slot.setDate(selectedDateStr);
            // Create appointment slots at 15 minutes apart.
            for (int minute = (int) Math.ceil(startMinutes / 15.0) * 15; minute < closeMinutes; minute += 15) {
                slot.addTime(formatDateTime(addMinutes(selectedDate, minute)));
            }
            clinicAppointment.addSlots(slot);
            options.addAppointment(clinicAppointment);
        }

        return ResponseEntity.ok(options);
    }
}
