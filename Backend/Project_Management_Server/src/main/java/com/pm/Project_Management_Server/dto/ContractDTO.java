package com.pm.Project_Management_Server.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContractDTO {
    private Long id;
    private Long projectId;
    private Long resourceReqId;
    private String duration;
    private Double amountQuoted;
} 