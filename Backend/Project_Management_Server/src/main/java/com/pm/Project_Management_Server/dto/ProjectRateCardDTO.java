package com.pm.Project_Management_Server.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import javax.persistence.OneToOne;
import javax.persistence.JoinColumn;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRateCardDTO {
    private Long id;
    @OneToOne
    @JoinColumn(name = "project_id")
    private Project project;
    private String level;
    private Double hourlyRate;
    private boolean isActive;
    private LocalDateTime lastUpdated;
} 