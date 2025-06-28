package com.pm.Project_Management_Server.service.impl;

import com.pm.Project_Management_Server.dto.GlobalRateCardDTO;
import com.pm.Project_Management_Server.dto.ProjectRateCardDTO;
import com.pm.Project_Management_Server.entity.GlobalRateCard;
import com.pm.Project_Management_Server.entity.Project;
import com.pm.Project_Management_Server.entity.ProjectRateCard;
import com.pm.Project_Management_Server.exception.NotFoundException;
import com.pm.Project_Management_Server.repository.GlobalRateCardRepository;
import com.pm.Project_Management_Server.repository.ProjectRateCardRepository;
import com.pm.Project_Management_Server.repository.ProjectRepository;
import com.pm.Project_Management_Server.service.RateCardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RateCardServiceImpl implements RateCardService {
    private final GlobalRateCardRepository globalRateCardRepository;
    private final ProjectRateCardRepository projectRateCardRepository;
    private final ProjectRepository projectRepository;

    @Override
    public List<GlobalRateCardDTO> getAllGlobalRates() {
        return globalRateCardRepository.findAll().stream()
                .map(this::toGlobalDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectRateCardDTO> getProjectRates(Long projectId) {
        return projectRateCardRepository.findAllByProject_Id(projectId).stream()
                .map(this::toProjectDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProjectRateCardDTO overrideRate(Long projectId, String level, Double rate) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException("Project not found with id: " + projectId));
        ProjectRateCard.Level lvl;
        try {
            lvl = ProjectRateCard.Level.valueOf(level);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid level: " + level);
        }
        // Deactivate any existing active rate for this project+level
        ProjectRateCard existing = projectRateCardRepository.findByProject_IdAndLevel(projectId, lvl);
        if (existing != null && existing.isIsActive()) {
            existing.setIsActive(false);
            projectRateCardRepository.save(existing);
        }
        ProjectRateCard prc = (existing != null) ? existing : new ProjectRateCard();
        prc.setProject(project);
        prc.setLevel(lvl);
        prc.setHourlyRate(rate);
        prc.setIsActive(true);
        prc.setLastUpdated(LocalDateTime.now());
        ProjectRateCard saved = projectRateCardRepository.save(prc);
        return toProjectDTO(saved);
    }

    @Override
    public void initializeProjectRatesFromGlobal(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException("Project not found with id: " + projectId));
        List<GlobalRateCard> globalRates = globalRateCardRepository.findAll();
        for (GlobalRateCard grc : globalRates) {
            ProjectRateCard prc = new ProjectRateCard();
            prc.setProject(project);
            prc.setLevel(ProjectRateCard.Level.valueOf(grc.getLevel().name()));
            prc.setHourlyRate(grc.getHourlyRate());
            prc.setIsActive(true);
            prc.setLastUpdated(LocalDateTime.now());
            projectRateCardRepository.save(prc);
        }
    }

    private GlobalRateCardDTO toGlobalDTO(GlobalRateCard grc) {
        return new GlobalRateCardDTO(grc.getId(), grc.getLevel().name(), grc.getHourlyRate());
    }

    private ProjectRateCardDTO toProjectDTO(ProjectRateCard prc) {
        return new ProjectRateCardDTO(
                prc.getId(),
                prc.getProject().getId(),
                prc.getLevel().name(),
                prc.getHourlyRate(),
                prc.isIsActive()
        );
    }
} 