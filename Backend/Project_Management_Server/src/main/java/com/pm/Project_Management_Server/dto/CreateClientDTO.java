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
public class CreateClientDTO {
    private String name;
    private String email;
    private LocalDate onBoardedOn;
    private Integer clientRating;
    private Boolean isActive;
} 

// for client creation, we need to create a DTO that is used to create a client