package com.pm.Project_Management_Server.service.impl;

import com.pm.Project_Management_Server.dto.CreateIssueDTO;
import com.pm.Project_Management_Server.dto.IssueResponseDTO;
import com.pm.Project_Management_Server.entity.Issue;
import com.pm.Project_Management_Server.entity.Project;
import com.pm.Project_Management_Server.exception.NotFoundException;
import com.pm.Project_Management_Server.repository.IssueRepository;
import com.pm.Project_Management_Server.repository.ProjectRepository;
import com.pm.Project_Management_Server.service.IssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IssueServiceImpl implements IssueService {
    private final IssueRepository issueRepository;
    private final ProjectRepository projectRepository;

    @Override
    public IssueResponseDTO createIssue(CreateIssueDTO dto) {
        Project project = projectRepository.findById(dto.getProjectId())
                .orElseThrow(() -> new NotFoundException("Project not found with id: " + dto.getProjectId()));
        Issue issue = new Issue();
        issue.setProject(project);
        issue.setSeverity(Issue.Severity.valueOf(dto.getSeverity()));
        issue.setDescription(dto.getDescription());
        issue.setCreatedBy(dto.getCreatedBy());
        issue.setCreatedDate(LocalDateTime.now());
        issue.setStatus(Issue.Status.OPEN);
        Issue saved = issueRepository.save(issue);
        return toResponseDTO(saved);
    }

    @Override
    public List<IssueResponseDTO> getAllIssues() {
        List<Issue> issues = issueRepository.findAll();
        return issues.stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    @Override
    public List<IssueResponseDTO> getIssuesByProject(Long projectId) {
        List<Issue> issues = issueRepository.findAllByProject_Id(projectId);
        return issues.stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    @Override
    public List<IssueResponseDTO> getIssuesBySeverity(Long projectId, String severity) {
        List<Issue> issues = issueRepository.findAllByProject_Id(projectId);
        return issues.stream()
                .filter(i -> i.getSeverity().name().equalsIgnoreCase(severity))
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public IssueResponseDTO closeIssue(Long id) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Issue not found with id: " + id));
        if (issue.getStatus() == Issue.Status.CLOSED) {
            throw new IllegalStateException("Issue is already closed.");
        }
        issue.setStatus(Issue.Status.CLOSED);
        Issue saved = issueRepository.save(issue);
        return toResponseDTO(saved);
    }

    private IssueResponseDTO toResponseDTO(Issue issue) {
        return new IssueResponseDTO(
                issue.getId(),
                issue.getProject().getId(),
                issue.getSeverity().name(),
                issue.getDescription(),
                issue.getCreatedBy(),
                issue.getCreatedDate(),
                issue.getStatus().name()
        );
    }
} 