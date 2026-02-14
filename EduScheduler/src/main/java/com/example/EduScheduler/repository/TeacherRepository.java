package com.example.EduScheduler.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.EduScheduler.entity.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
}
