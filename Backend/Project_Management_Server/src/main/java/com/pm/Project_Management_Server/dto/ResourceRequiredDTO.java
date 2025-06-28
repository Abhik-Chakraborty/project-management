package com.pm.Project_Management_Server.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResourceRequiredDTO {
    private Long id;
    private String resourceLevel;
    private int quantity;
    private Long projectId;
} 