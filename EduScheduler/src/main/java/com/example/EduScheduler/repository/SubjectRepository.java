package com.example.EduScheduler.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.EduScheduler.entity.Subject;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
}
