package com.example.EduScheduler.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "class_divisions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassDivision {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String className; // e.g. MCA, BCA
    private String division; // e.g. A, B
}
