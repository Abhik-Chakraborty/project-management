package com.pm.Project_Management_Server.repository;

import com.pm.Project_Management_Server.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ResourceRepository extends JpaRepository<Resource, Long> {
    List<Resource> findAllByProject_Id(Long projectId);
} 