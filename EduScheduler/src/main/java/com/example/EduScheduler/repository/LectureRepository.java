package com.example.EduScheduler.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.EduScheduler.entity.Lecture;

public interface LectureRepository extends JpaRepository<Lecture, Long> {

    // Find lectures assigned to a specific teacher
    List<Lecture> findByTeacherId(Long teacherId);
}
