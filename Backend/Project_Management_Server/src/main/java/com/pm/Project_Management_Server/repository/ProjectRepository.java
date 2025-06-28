package com.pm.Project_Management_Server.repository;

import com.pm.Project_Management_Server.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByClientId(Long clientId);
    boolean existsByProjectName(String projectName);
} 