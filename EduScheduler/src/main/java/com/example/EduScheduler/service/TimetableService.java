package com.example.EduScheduler.service;

import java.util.*;

import com.example.EduScheduler.dto.LectureRequestDTO;
import com.example.EduScheduler.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.EduScheduler.entity.Lecture;

@Service
public class TimetableService {

    @Autowired
    private LectureRepository lectureRepository;
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private ClassroomRepository classroomRepository;
    @Autowired
    private ClassDivisionRepository classDivisionRepository;

    public List<Lecture> generateTimetableFromDTO(List<LectureRequestDTO> dtos) {

        List<Lecture> lectures = new ArrayList<>();
        Set<String> occupied = new HashSet<>();

        for (LectureRequestDTO dto : dtos) {

            String key = dto.getTeacherId() + "-" + dto.getDay() + "-" + dto.getTimeSlot();
            if (occupied.contains(key)) continue;
            occupied.add(key);

            Lecture lecture = new Lecture();
            lecture.setDay(dto.getDay());
            lecture.setTimeSlot(dto.getTimeSlot());

            lecture.setTeacher(
                    teacherRepository.findById(dto.getTeacherId()).orElseThrow()
            );
            lecture.setSubject(
                    subjectRepository.findById(dto.getSubjectId()).orElseThrow()
            );
            lecture.setClassroom(
                    classroomRepository.findById(dto.getClassroomId()).orElseThrow()
            );
            lecture.setClassDivision(
                    classDivisionRepository.findById(dto.getClassDivisionId()).orElseThrow()
            );

            lectures.add(lecture);
        }

        return lectureRepository.saveAll(lectures);
    }
}
