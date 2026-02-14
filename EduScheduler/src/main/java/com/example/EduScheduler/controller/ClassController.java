package com.example.EduScheduler.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.EduScheduler.entity.ClassDivision;
import com.example.EduScheduler.service.ClassService;

@RestController
@RequestMapping("/class")
public class ClassController {

    @Autowired
    private ClassService classService;

    // Add new class division
    @PostMapping("/add")
    public ClassDivision addClass(@RequestBody ClassDivision classDivision) {
        return classService.addClass(classDivision);
    }

    // View all class divisions
    @GetMapping("/all")
    public List<ClassDivision> getAllClasses() {
        return classService.getAllClasses();
    }
}
