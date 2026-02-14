package com.example.EduScheduler.controller;

import java.util.List;

import com.example.EduScheduler.dto.LectureRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.EduScheduler.entity.Lecture;
import com.example.EduScheduler.service.TimetableService;

@RestController
@RequestMapping("/timetable")
public class TimetableController {

    @Autowired
    private TimetableService timetableService;

    @PostMapping("/generate")
    public List<Lecture> generateTimetable(
            @RequestBody List<LectureRequestDTO> requests) {
        return timetableService.generateTimetableFromDTO(requests);
    }

}
