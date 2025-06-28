package com.pm.Project_Management_Server.service;

import com.pm.Project_Management_Server.dto.CreateIssueDTO;
import com.pm.Project_Management_Server.dto.IssueResponseDTO;
import java.util.List;

public interface IssueService {
    IssueResponseDTO createIssue(CreateIssueDTO dto);
    List<IssueResponseDTO> getIssuesByProject(Long projectId);
    List<IssueResponseDTO> getIssuesBySeverity(Long projectId, String severity);
    IssueResponseDTO closeIssue(Long id);
} 