package com.example.EduScheduler.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.EduScheduler.entity.*;
import com.example.EduScheduler.service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;

    // ADD TEACHER
    @PostMapping("/teacher")
    public Teacher addTeacher(@RequestBody Teacher teacher) {
        return adminService.addTeacher(teacher);
    }

    // ADD SUBJECT
    @PostMapping("/subject")
    public Subject addSubject(@RequestBody Subject subject) {
        return adminService.addSubject(subject);
    }

    // ADD CLASSROOM
    @PostMapping("/classroom")
    public Classroom addClassroom(@RequestBody Classroom classroom) {
        return adminService.addClassroom(classroom);
    }

    // GET ALL TEACHERS
    @GetMapping("/teachers")
    public List<Teacher> getAllTeachers() {
        return adminService.getAllTeachers();
    }

    // GET ALL SUBJECTS
    @GetMapping("/subjects")
    public List<Subject> getSubjects() {
        return adminService.getAllSubjects();
    }

    // GET ALL CLASSROOMS
    @GetMapping("/classrooms")
    public List<Classroom> getClassrooms() {
        return adminService.getAllClassrooms();
    }
}
