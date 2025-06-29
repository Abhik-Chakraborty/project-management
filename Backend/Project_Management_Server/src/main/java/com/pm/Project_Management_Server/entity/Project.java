package com.pm.Project_Management_Server.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String projectName;
    private String type;

    @Enumerated(EnumType.STRING)
    private Department department;

    @Enumerated(EnumType.STRING)
    private Status status;

    private Long clientId; // FK placeholder
    private Long contactPersonId; // FK placeholder
    private Long managerId;
    private Long projectLeadId;
    private Double budgets;

    @ElementCollection
    private List<Long> listOfHighlights; // Placeholder for highlight IDs

    @ElementCollection
    private List<Long> listOfResources; // Placeholder for resource IDs

    private Long contractId; // FK placeholder

    public enum Department {
        IT, HR, FINANCE, MARKETING, SALES, OTHER
    }

    public enum Status {
        INITIATED, IN_PROGRESS, COMPLETED, ON_HOLD, CANCELLED
    }
} 