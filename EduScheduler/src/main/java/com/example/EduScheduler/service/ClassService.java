package com.example.EduScheduler.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.EduScheduler.entity.ClassDivision;
import com.example.EduScheduler.repository.ClassDivisionRepository;

@Service
public class ClassService {

    @Autowired
    private ClassDivisionRepository classDivisionRepository;

    // Add new class division
    public ClassDivision addClass(ClassDivision classDivision) {
        return classDivisionRepository.save(classDivision);
    }

    // Get all class divisions
    public List<ClassDivision> getAllClasses() {
        return classDivisionRepository.findAll();
    }
}
