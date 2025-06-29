package com.pm.Project_Management_Server.dto;

import com.pm.Project_Management_Server.entity.Project;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRateCardDTO {
    private Long id;
    private Long project;
    private String level;
    private Double hourlyRate;
    private boolean active;
    private LocalDateTime lastUpdated;
} 