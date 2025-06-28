package com.pm.Project_Management_Server.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResourceRequired {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ResourceLevel resourceLevel;

    private String expRange;
    private int quantity;
    @OneToOne
    @JoinColumn(name = "project_id")
    private Project project;

    public enum ResourceLevel {
        JR, INTERMEDIATE, SR, ADVANCE, EXPERT
    }
} 