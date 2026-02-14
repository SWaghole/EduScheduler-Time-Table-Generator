package com.example.EduScheduler.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.EduScheduler.entity.Classroom;

public interface ClassroomRepository extends JpaRepository<Classroom, Long> {
}
