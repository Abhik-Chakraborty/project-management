package com.pm.Project_Management_Server.service;

import com.pm.Project_Management_Server.dto.CreateProjectDTO;
import com.pm.Project_Management_Server.dto.ProjectDTO;
import com.pm.Project_Management_Server.dto.ProjectLeadDTO;

public interface ProjectService {
    ProjectDTO createProject(CreateProjectDTO dto);
    ProjectDTO getProjectById(Long id);
    ProjectLeadDTO assignProjectLead(Long projectId, Long userId);
} 