package com.pm.Project_Management_Server.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateProjectDTO {
    private String projectName;
    private String type;
    private String department;
    private String status;
    private Long clientId;
    private Long contactPersonId;
    private Long managerId;
    private Long projectLeadId;
    private Double budgets;
    private List<Long> listOfHighlights;
    private List<Long> listOfResources;
    private Long contractId;
} 