package com.pm.Project_Management_Server.repository;

import com.pm.Project_Management_Server.entity.OpenPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OpenPositionRepository extends JpaRepository<OpenPosition, Long> {
    List<OpenPosition> findAllByProject_Id(Long projectId);
} 