package com.pm.Project_Management_Server.service.impl;

import com.pm.Project_Management_Server.dto.ResourceRequiredDTO;
import com.pm.Project_Management_Server.entity.Project;
import com.pm.Project_Management_Server.entity.ResourceRequired;
import com.pm.Project_Management_Server.exception.NotFoundException;
import com.pm.Project_Management_Server.repository.ProjectRepository;
import com.pm.Project_Management_Server.repository.ResourceRequiredRepository;
import com.pm.Project_Management_Server.service.ResourceRequiredService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResourceRequiredServiceImpl implements ResourceRequiredService {
    private final ResourceRequiredRepository resourceRequiredRepository;
    private final ProjectRepository projectRepository;

    @Override
    public ResourceRequiredDTO addResourceRequirement(ResourceRequiredDTO dto) {
        if (dto.getQuantity() < 0) {
            throw new IllegalArgumentException("Quantity must be >= 0");
        }
        Project project = projectRepository.findById(dto.getProjectId())
                .orElseThrow(() -> new NotFoundException("Project not found with id: " + dto.getProjectId()));
        ResourceRequired resourceRequired = new ResourceRequired();
        resourceRequired.setResourceLevel(ResourceRequired.ResourceLevel.valueOf(dto.getResourceLevel()));
        resourceRequired.setQuantity(dto.getQuantity());
//        resourceRequired.setProjectId(dto.getProjectId());
        resourceRequired.setProject(project);
        // Always auto-populate expRange
        resourceRequired.setExpRange(autoPopulateExpRange(dto.getResourceLevel()));
        ResourceRequired saved = resourceRequiredRepository.save(resourceRequired);
        return toDTO(saved);
    }

    @Override
    public List<ResourceRequiredDTO> getRequirementsForProject(Long projectId) {
        List<ResourceRequired> requirements = resourceRequiredRepository.findAllByProject_Id(projectId);
        if (requirements.isEmpty()) {
            throw new NotFoundException("No resource requirements found for projectId: " + projectId);
        }
        return requirements.stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public String autoPopulateExpRange(String level) {
        switch (level.toUpperCase()) {
            case "JR": return "0-2 years";
            case "INTERMEDIATE": return "2-5 years";
            case "SR": return "5-8 years";
            case "ADVANCE": return "8-12 years";
            case "EXPERT": return "12+ years";
            default: return "Unknown";
        }
    }

    private ResourceRequiredDTO toDTO(ResourceRequired entity) {
        return new ResourceRequiredDTO(
                entity.getId(),
                entity.getResourceLevel().name(),
                entity.getQuantity(),
                entity.getProject().getId()
        );
    }
}
