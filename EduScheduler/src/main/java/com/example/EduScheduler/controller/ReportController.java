package com.example.EduScheduler.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.EduScheduler.entity.Lecture;
import com.example.EduScheduler.service.ReportService;

@RestController
@RequestMapping("/report")
public class ReportController {

    @Autowired
    private ReportService reportService;

    // Generate timetable report
    @GetMapping("/timetable")
    public List<Lecture> generateReport() {
        return reportService.generateReport();
    }

    // Send notification
    @PostMapping("/notify")
    public String sendNotification(@RequestParam String message) {
        reportService.sendNotification(message);
        return "Notification sent successfully";
    }
}
