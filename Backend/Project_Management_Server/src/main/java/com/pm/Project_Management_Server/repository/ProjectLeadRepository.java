package com.pm.Project_Management_Server.repository;

import com.pm.Project_Management_Server.entity.ProjectLead;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectLeadRepository extends JpaRepository<ProjectLead, Long> {
    ProjectLead findByProject_Id(Long projectId);
    ProjectLead findByUser_Id(Long userId);
} 