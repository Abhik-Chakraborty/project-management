package com.pm.Project_Management_Server.repository;

import com.pm.Project_Management_Server.entity.ProjectRateCard;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectRateCardRepository extends JpaRepository<ProjectRateCard, Long> {
    List<ProjectRateCard> findAllByProject_Id(Long projectId);
    ProjectRateCard findByProject_IdAndLevel(Long projectId, ProjectRateCard.Level level);
} 