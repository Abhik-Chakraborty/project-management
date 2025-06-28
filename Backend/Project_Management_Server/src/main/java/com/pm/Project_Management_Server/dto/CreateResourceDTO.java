package com.pm.Project_Management_Server.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateResourceDTO {
    private String resourceName;
    private int exp;
    private Long projectId;
    private LocalDate startDate;
    private LocalDate endDate;
    private int allocationPercentage;
} 