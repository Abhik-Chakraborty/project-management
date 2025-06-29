package com.pm.Project_Management_Server.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateHighlightDTO {
    private Long projectId;
    @NotBlank(message = "Description must not be blank")
    private String description;
} 