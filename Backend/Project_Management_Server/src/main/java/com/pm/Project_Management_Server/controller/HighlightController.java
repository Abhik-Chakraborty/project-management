package com.pm.Project_Management_Server.controller;

import com.pm.Project_Management_Server.dto.CreateHighlightDTO;
import com.pm.Project_Management_Server.dto.HighlightResponseDTO;
import com.pm.Project_Management_Server.service.HighlightService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/highlights")
@RequiredArgsConstructor
public class HighlightController {
    private final HighlightService highlightService;

    @PostMapping
    public ResponseEntity<HighlightResponseDTO> addHighlight(@RequestBody CreateHighlightDTO dto) {
        HighlightResponseDTO created = highlightService.addHighlight(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<HighlightResponseDTO>> getHighlightsByProject(@PathVariable Long projectId) {
        List<HighlightResponseDTO> highlights = highlightService.getHighlightsByProject(projectId);
        return ResponseEntity.ok(highlights);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHighlight(@PathVariable Long id) {
        highlightService.deleteHighlight(id);
        return ResponseEntity.noContent().build();
    }
} 