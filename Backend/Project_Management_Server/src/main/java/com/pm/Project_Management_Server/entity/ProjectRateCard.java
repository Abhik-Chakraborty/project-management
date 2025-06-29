package com.pm.Project_Management_Server.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRateCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @Enumerated(EnumType.STRING)
    private Level level;

    private Double hourlyRate;
    private boolean active;
    private LocalDateTime lastUpdated;

    public enum Level {
        JR, INTERMEDIATE, SR, ADVANCE, EXPERT
    }
} 