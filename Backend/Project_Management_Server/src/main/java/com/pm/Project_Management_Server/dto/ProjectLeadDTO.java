package com.pm.Project_Management_Server.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectLeadDTO {
    private Long id;
    private Long userId;
    private Long projectId;
} 