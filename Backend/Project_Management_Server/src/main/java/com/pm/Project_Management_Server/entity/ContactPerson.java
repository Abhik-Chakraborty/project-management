package com.pm.Project_Management_Server.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContactPerson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private Long projectId; // FK placeholder, will be replaced with @ManyToOne when Project is ready
} 