package com.pm.Project_Management_Server.controller;

import com.pm.Project_Management_Server.dto.CreateIssueDTO;
import com.pm.Project_Management_Server.dto.IssueResponseDTO;
import com.pm.Project_Management_Server.service.IssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
@RequiredArgsConstructor
public class IssueController {
    private final IssueService issueService;

    @PostMapping
    public ResponseEntity<IssueResponseDTO> createIssue(@RequestBody CreateIssueDTO dto) {
        IssueResponseDTO created = issueService.createIssue(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<IssueResponseDTO>> getIssuesByProject(
            @PathVariable Long projectId,
            @RequestParam(value = "severity", required = false) String severity) {
        if (severity != null) {
            return ResponseEntity.ok(issueService.getIssuesBySeverity(projectId, severity));
        } else {
            return ResponseEntity.ok(issueService.getIssuesByProject(projectId));
        }
    }

    @PutMapping("/{id}/close")
    public ResponseEntity<IssueResponseDTO> closeIssue(@PathVariable Long id) {
        IssueResponseDTO closed = issueService.closeIssue(id);
        return ResponseEntity.ok(closed);
    }
} 