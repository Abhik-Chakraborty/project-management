package com.pm.Project_Management_Server.repository;

import com.pm.Project_Management_Server.entity.Highlight;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HighlightRepository extends JpaRepository<Highlight, Long> {
    List<Highlight> findAllByProject_Id(Long projectId);
} 