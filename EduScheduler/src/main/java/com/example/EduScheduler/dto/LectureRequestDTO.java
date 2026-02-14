package com.example.EduScheduler.dto;

import lombok.Data;

@Data
public class LectureRequestDTO {
    private String day;
    private String timeSlot;

    private Long teacherId;
    private Long subjectId;
    private Long classroomId;
    private Long classDivisionId;
}
