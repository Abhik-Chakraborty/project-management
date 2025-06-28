package com.pm.Project_Management_Server.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContractResponseDTO {
    private Long contractId;
    private String projectName;
    private String duration;
    private Double quotedAmount;
    private String resourceLevel;
} 