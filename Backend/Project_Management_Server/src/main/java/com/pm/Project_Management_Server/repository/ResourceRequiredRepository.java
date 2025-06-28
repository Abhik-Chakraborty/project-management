package com.pm.Project_Management_Server.repository;

import com.pm.Project_Management_Server.entity.ResourceRequired;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ResourceRequiredRepository extends JpaRepository<ResourceRequired, Long> {
    List<ResourceRequired> findAllByProjectId(Long projectId);
} 