package com.example.EduScheduler.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.EduScheduler.entity.*;
import com.example.EduScheduler.repository.*;

@Service
public class AdminService {

    @Autowired private TeacherRepository teacherRepo;
    @Autowired private SubjectRepository subjectRepo;
    @Autowired private ClassroomRepository classroomRepo;

    public Teacher addTeacher(Teacher teacher) {
        return teacherRepo.save(teacher);
    }

    public Subject addSubject(Subject subject) {
        return subjectRepo.save(subject);
    }

    public Classroom addClassroom(Classroom classroom) {
        return classroomRepo.save(classroom);
    }

    public List<Teacher> getAllTeachers() {
        return teacherRepo.findAll();
    }

    public List<Subject> getAllSubjects() {
        return subjectRepo.findAll();
    }

    public List<Classroom> getAllClassrooms() {
        return classroomRepo.findAll();
    }
}
