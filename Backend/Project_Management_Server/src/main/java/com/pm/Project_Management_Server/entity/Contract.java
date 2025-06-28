package com.pm.Project_Management_Server.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "project_id")
    private Project project;
    private String duration;
    @OneToOne
    @JoinColumn(name = "resource_req_id")
    private ResourceRequired resourceRequired;
    private Double amountQuoted;
} 