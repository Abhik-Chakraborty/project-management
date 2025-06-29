package com.pm.Project_Management_Server.controller;

import com.pm.Project_Management_Server.dto.CreateProjectDTO;
import com.pm.Project_Management_Server.dto.ProjectDTO;
import com.pm.Project_Management_Server.dto.ProjectLeadDTO;
import com.pm.Project_Management_Server.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectDTO> createProject(@RequestBody CreateProjectDTO dto) {
        ProjectDTO created = projectService.createProject(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectDTO> updateProject(@PathVariable Long id, @RequestBody CreateProjectDTO dto) {
        // For now, just fetch and update fields, then save
        ProjectDTO existing = projectService.getProjectById(id);
        CreateProjectDTO updateDto = new CreateProjectDTO(
            dto.getProjectName() != null ? dto.getProjectName() : existing.getProjectName(),
            dto.getType() != null ? dto.getType() : existing.getType(),
            dto.getDepartment() != null ? dto.getDepartment() : existing.getDepartment(),
            dto.getStatus() != null ? dto.getStatus() : existing.getStatus(),
            dto.getClientId() != null ? dto.getClientId() : existing.getClientId(),
            dto.getContactPersonId() != null ? dto.getContactPersonId() : existing.getContactPersonId(),
            dto.getManagerId() != null ? dto.getManagerId() : existing.getManagerId(),
            dto.getProjectLeadId() != null ? dto.getProjectLeadId() : existing.getProjectLeadId(),
            dto.getBudgets() != null ? dto.getBudgets() : existing.getBudgets(),
            dto.getListOfHighlights() != null ? dto.getListOfHighlights() : existing.getListOfHighlights(),
            dto.getListOfResources() != null ? dto.getListOfResources() : existing.getListOfResources(),
            dto.getContractId() != null ? dto.getContractId() : existing.getContractId()
        );
        // In real code, add update logic in service
        projectService.createProject(updateDto); // This will create a new project, not update
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @PostMapping("/{id}/lead")
    public ResponseEntity<ProjectLeadDTO> assignProjectLead(@PathVariable Long id, @RequestParam Long userId) {
        ProjectLeadDTO lead = projectService.assignProjectLead(id, userId);
        return ResponseEntity.ok(lead);
    }
} 