package com.pm.Project_Management_Server.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IssueResponseDTO {
    private Long id;
    private Long projectId;
    private String severity;
    private String description;
    private String createdBy;
    private LocalDateTime createdDate;
    private String status;
} 