package com.pm.Project_Management_Server.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Resource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String resourceName;
    @OneToOne
    @JoinColumn(name = "project_id")
    private Project project;
    private LocalDate startDate;
    private LocalDate endDate;
    private int exp;
    private int allocationPercentage = 100;
} 