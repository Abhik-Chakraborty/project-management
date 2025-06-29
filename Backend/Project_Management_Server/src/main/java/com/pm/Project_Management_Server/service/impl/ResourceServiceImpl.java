package com.pm.Project_Management_Server.service.impl;

import com.pm.Project_Management_Server.dto.CreateResourceDTO;
import com.pm.Project_Management_Server.entity.Project;
import com.pm.Project_Management_Server.entity.Resource;
import com.pm.Project_Management_Server.exception.NotFoundException;
import com.pm.Project_Management_Server.repository.ProjectRepository;
import com.pm.Project_Management_Server.repository.ResourceRepository;
import com.pm.Project_Management_Server.repository.ResourceRequiredRepository;
import com.pm.Project_Management_Server.service.ResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResourceServiceImpl implements ResourceService {
    private final ResourceRepository resourceRepository;
    private final ProjectRepository projectRepository;
    private final ResourceRequiredRepository resourceRequiredRepository;

    @Override
    public Resource addResource(CreateResourceDTO dto) {
        // Validate projectId
        Project project = projectRepository.findById(dto.getProjectId())
                .orElseThrow(() -> new NotFoundException("Project not found with id: " + dto.getProjectId()));
        // Validate allocation
        if (!validateAllocation(dto.getAllocationPercentage())) {
            throw new IllegalArgumentException("Allocation percentage must be between 1 and 100");
        }
        // Prevent over-allocation
        int totalAllocated = resourceRepository.findAllByProject_Id(dto.getProjectId())
            .stream().mapToInt(Resource::getAllocationPercentage).sum();
        // Assume ResourceRequiredRepository is available and injected
        int maxAllowed = Integer.MAX_VALUE;
        // ... inject ResourceRequiredRepository as resourceRequiredRepository ...
        // For each resource, you may want to check by level if you add level to Resource
        // For now, check by project
        List<com.pm.Project_Management_Server.entity.ResourceRequired> reqs = resourceRequiredRepository.findAllByProject_Id(dto.getProjectId());        if (!reqs.isEmpty()) {
            int requiredTotal = reqs.stream().mapToInt(com.pm.Project_Management_Server.entity.ResourceRequired::getQuantity).sum() * 100;
            maxAllowed = requiredTotal;
        }
        if (totalAllocated + dto.getAllocationPercentage() > maxAllowed) {
            throw new com.pm.Project_Management_Server.exception.OverAllocationException("Allocated resources exceed requirement for this project.");
        }
        Resource resource = new Resource();
        resource.setResourceName(dto.getResourceName());
        resource.setExp(dto.getExp());
        resource.setProject(project);
        resource.setStartDate(dto.getStartDate());
        resource.setEndDate(dto.getEndDate());
        resource.setAllocationPercentage(dto.getAllocationPercentage());
        return resourceRepository.save(resource);
    }

    @Override
    public List<Resource> getResourcesByProject(Long projectId) {
        return resourceRepository.findAllByProject_Id(projectId);
    }

    @Override
    public boolean validateAllocation(int allocationPercentage) {
        return allocationPercentage > 0 && allocationPercentage <= 100;
    }
} 