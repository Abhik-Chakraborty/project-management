package com.pm.Project_Management_Server.service;

import com.pm.Project_Management_Server.dto.CreateProjectDTO;
import com.pm.Project_Management_Server.dto.ProjectDTO;
import com.pm.Project_Management_Server.dto.ProjectLeadDTO;
import java.util.List;

public interface ProjectService {
    ProjectDTO createProject(CreateProjectDTO dto);
    ProjectDTO getProjectById(Long id);
    List<ProjectDTO> getAllProjects();
    ProjectLeadDTO assignProjectLead(Long projectId, Long userId);
} 