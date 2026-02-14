package com.example.EduScheduler.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.EduScheduler.entity.Lecture;
import com.example.EduScheduler.entity.Teacher;
import com.example.EduScheduler.repository.LectureRepository;
import com.example.EduScheduler.repository.TeacherRepository;

@Service
public class TeacherService {

    @Autowired
    private LectureRepository lectureRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    // Get lectures assigned to a teacher
    public List<Lecture> getTeacherLectures(Long teacherId) {
        return lectureRepository.findByTeacherId(teacherId);
    }

    // Update teacher availability
    public Teacher updateAvailability(Long teacherId, String availability) {
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        teacher.setAvailability(availability);
        return teacherRepository.save(teacher);
    }
}
