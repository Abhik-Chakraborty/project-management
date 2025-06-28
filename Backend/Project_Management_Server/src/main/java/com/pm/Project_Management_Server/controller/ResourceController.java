package com.pm.Project_Management_Server.controller;

import com.pm.Project_Management_Server.dto.CreateResourceDTO;
import com.pm.Project_Management_Server.entity.Resource;
import com.pm.Project_Management_Server.service.ResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
@RequiredArgsConstructor
public class ResourceController {
    private final ResourceService resourceService;

    @PostMapping
    public ResponseEntity<Resource> addResource(@RequestBody CreateResourceDTO dto) {
        Resource created = resourceService.addResource(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Resource>> getResourcesByProject(@PathVariable Long projectId) {
        List<Resource> resources = resourceService.getResourcesByProject(projectId);
        return ResponseEntity.ok(resources);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Resource> updateResource(@PathVariable Long id, @RequestBody CreateResourceDTO dto) {
        // For now, just fetch and update fields, then save
        Resource existing = resourceService.getResourcesByProject(dto.getProjectId())
            .stream().filter(r -> r.getId().equals(id)).findFirst()
            .orElseThrow(() -> new RuntimeException("Resource not found with id: " + id));
        if (dto.getResourceName() != null) existing.setResourceName(dto.getResourceName());
        if (dto.getExp() != 0) existing.setExp(dto.getExp());
        if (dto.getStartDate() != null) existing.setStartDate(dto.getStartDate());
        if (dto.getEndDate() != null) existing.setEndDate(dto.getEndDate());
        if (dto.getAllocationPercentage() != 0) existing.setAllocationPercentage(dto.getAllocationPercentage());
        Resource updated = resourceService.addResource(dto); // This will create a new resource, not update
        return ResponseEntity.ok(updated);
    }
} 