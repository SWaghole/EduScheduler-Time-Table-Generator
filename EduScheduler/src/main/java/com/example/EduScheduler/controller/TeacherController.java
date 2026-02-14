package com.example.EduScheduler.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.EduScheduler.entity.Lecture;
import com.example.EduScheduler.entity.Teacher;
import com.example.EduScheduler.service.TeacherService;

@RestController
@RequestMapping("/teacher")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    // View lectures assigned to a teacher
    @GetMapping("/{teacherId}/lectures")
    public List<Lecture> getTeacherLectures(@PathVariable Long teacherId) {
        return teacherService.getTeacherLectures(teacherId);
    }

    // Update teacher availability
    @PutMapping("/{teacherId}/availability")
    public Teacher updateAvailability(
            @PathVariable Long teacherId,
            @RequestParam String availability) {
        return teacherService.updateAvailability(teacherId, availability);
    }
}
