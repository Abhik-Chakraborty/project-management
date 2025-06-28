package com.pm.Project_Management_Server.service.impl;

import com.pm.Project_Management_Server.dto.CreateHighlightDTO;
import com.pm.Project_Management_Server.dto.HighlightResponseDTO;
import com.pm.Project_Management_Server.entity.Highlight;
import com.pm.Project_Management_Server.entity.Project;
import com.pm.Project_Management_Server.exception.DuplicateResourceException;
import com.pm.Project_Management_Server.exception.NotFoundException;
import com.pm.Project_Management_Server.repository.HighlightRepository;
import com.pm.Project_Management_Server.repository.ProjectRepository;
import com.pm.Project_Management_Server.service.HighlightService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HighlightServiceImpl implements HighlightService {
    private final HighlightRepository highlightRepository;
    private final ProjectRepository projectRepository;

    @Override
    public HighlightResponseDTO addHighlight(CreateHighlightDTO dto) {
        if (dto.getDescription() == null || dto.getDescription().trim().isEmpty()) {
            throw new IllegalArgumentException("Description must not be null or blank");
        }
        Project project = projectRepository.findById(dto.getProjectId())
                .orElseThrow(() -> new NotFoundException("Project not found with id: " + dto.getProjectId()));
        LocalDate today = LocalDate.now();
        boolean exists = highlightRepository.findAllByProject_Id(project.getId())
            .stream()
            .anyMatch(h -> h.getCreatedOn().equals(today));
        if (exists) {
            throw new DuplicateResourceException("A highlight already exists for this project on " + today);
        }
        Highlight highlight = new Highlight();
        highlight.setProject(project);
        highlight.setDescription(dto.getDescription());
        highlight.setCreatedOn(today);
        Highlight saved = highlightRepository.save(highlight);
        return toResponseDTO(saved);
    }

    @Override
    public List<HighlightResponseDTO> getHighlightsByProject(Long projectId) {
        List<Highlight> highlights = highlightRepository.findAllByProject_Id(projectId);
        return highlights.stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    @Override
    public void deleteHighlight(Long id) {
        Highlight highlight = highlightRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Highlight not found with id: " + id));
        highlightRepository.delete(highlight);
    }

    private HighlightResponseDTO toResponseDTO(Highlight highlight) {
        return new HighlightResponseDTO(
                highlight.getId(),
                highlight.getProject().getId(),
                highlight.getDescription(),
                highlight.getCreatedOn()
        );
    }
} 