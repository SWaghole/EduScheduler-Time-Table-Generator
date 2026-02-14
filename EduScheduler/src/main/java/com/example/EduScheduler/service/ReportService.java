package com.example.EduScheduler.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.EduScheduler.entity.Lecture;
import com.example.EduScheduler.repository.LectureRepository;

@Service
public class ReportService {

    @Autowired
    private LectureRepository lectureRepository;

    // Generate timetable report
    public List<Lecture> generateReport() {
        return lectureRepository.findAll();
    }

    // Send notification (console-based)
    public void sendNotification(String message) {
        System.out.println("TIMETABLE NOTIFICATION: " + message);
    }
}
