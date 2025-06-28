package com.pm.Project_Management_Server.controller;

import com.pm.Project_Management_Server.dto.ResourceRequiredDTO;
import com.pm.Project_Management_Server.service.ResourceRequiredService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resource-required")
@RequiredArgsConstructor
public class ResourceRequiredController {
    private final ResourceRequiredService resourceRequiredService;

    @PostMapping
    public ResponseEntity<ResourceRequiredDTO> addResourceRequirement(@RequestBody ResourceRequiredDTO dto) {
        ResourceRequiredDTO created = resourceRequiredService.addResourceRequirement(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<ResourceRequiredDTO>> getRequirementsForProject(@PathVariable Long projectId) {
        List<ResourceRequiredDTO> requirements = resourceRequiredService.getRequirementsForProject(projectId);
        return ResponseEntity.ok(requirements);
    }
} 