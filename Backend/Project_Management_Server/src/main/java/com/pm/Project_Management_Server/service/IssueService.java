package com.pm.Project_Management_Server.service;

import com.pm.Project_Management_Server.dto.CreateIssueDTO;
import com.pm.Project_Management_Server.dto.IssueResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface IssueService {
    IssueResponseDTO createIssue(CreateIssueDTO dto);
    List<IssueResponseDTO> getAllIssues();
    List<IssueResponseDTO> getIssuesByProject(Long projectId);
    List<IssueResponseDTO> getIssuesBySeverity(Long projectId, String severity);
    IssueResponseDTO closeIssue(Long id);
} 