package com.example.EduScheduler.dto;

import lombok.Data;

@Data
public class RegisterRequestDTO {
    private String name;
    private String email;
    private String password;
    private String role; // ROLE_ADMIN or ROLE_TEACHER
}
