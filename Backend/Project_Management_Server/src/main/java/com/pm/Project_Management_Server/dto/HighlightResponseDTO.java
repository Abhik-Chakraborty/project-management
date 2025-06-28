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
public class HighlightResponseDTO {
    private Long id;
    private Long projectId;
    private String description;
    private LocalDate createdOn;
} 