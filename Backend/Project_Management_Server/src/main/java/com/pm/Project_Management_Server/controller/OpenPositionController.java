package com.pm.Project_Management_Server.controller;

import com.pm.Project_Management_Server.dto.OpenPositionDTO;
import com.pm.Project_Management_Server.service.OpenPositionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/open-positions")
@RequiredArgsConstructor
public class OpenPositionController {
    private final OpenPositionService openPositionService;

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<OpenPositionDTO>> getOpenPositionsByProject(@PathVariable Long projectId) {
        List<OpenPositionDTO> openPositions = openPositionService.getOpenPositionsByProject(projectId);
        return ResponseEntity.ok(openPositions);
    }
} 