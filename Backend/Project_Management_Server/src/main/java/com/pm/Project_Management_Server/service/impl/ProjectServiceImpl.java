package com.pm.Project_Management_Server.service.impl;

import com.pm.Project_Management_Server.dto.CreateProjectDTO;
import com.pm.Project_Management_Server.dto.ProjectDTO;
import com.pm.Project_Management_Server.dto.ProjectLeadDTO;
import com.pm.Project_Management_Server.entity.Project;
import com.pm.Project_Management_Server.entity.ProjectLead;
import com.pm.Project_Management_Server.entity.User;
import com.pm.Project_Management_Server.entity.Client;
import com.pm.Project_Management_Server.exception.DuplicateResourceException;
import com.pm.Project_Management_Server.exception.NotFoundException;
import com.pm.Project_Management_Server.repository.ContactPersonRepository;
import com.pm.Project_Management_Server.repository.ProjectLeadRepository;
import com.pm.Project_Management_Server.repository.ProjectRepository;
import com.pm.Project_Management_Server.repository.UserRepository;
import com.pm.Project_Management_Server.repository.ClientRepository;
import com.pm.Project_Management_Server.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectLeadRepository projectLeadRepository;
    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final ContactPersonRepository contactPersonRepository;

    @Override
    public ProjectDTO createProject(CreateProjectDTO dto) {
        // Validate clientId
        if (!clientRepository.existsById(dto.getClientId())) {
            throw new NotFoundException("Client not found with id: " + dto.getClientId());
        }
        // Validate contactPersonId
        if (!contactPersonRepository.existsById(dto.getContactPersonId())) {
            throw new NotFoundException("ContactPerson not found with id: " + dto.getContactPersonId());
        }
        // Validate projectLeadId
        if (dto.getProjectLeadId() != null && !userRepository.existsById(dto.getProjectLeadId())) {
            throw new NotFoundException("ProjectLead (User) not found with id: " + dto.getProjectLeadId());
        }
        // Validate uniqueness of projectName
        if (projectRepository.existsByProjectName(dto.getProjectName())) {
            throw new DuplicateResourceException("Project name already exists: " + dto.getProjectName());
        }
        Project project = new Project();
        project.setProjectName(dto.getProjectName());
        project.setType(dto.getType());
        project.setDepartment(Project.Department.valueOf(dto.getDepartment()));
        project.setStatus(Project.Status.valueOf(dto.getStatus()));
        // Set client entity
        Client client = clientRepository.findById(dto.getClientId())
            .orElseThrow(() -> new NotFoundException("Client not found with id: " + dto.getClientId()));
        project.setClient(client);
        project.setContactPersonId(dto.getContactPersonId());
        project.setManagerId(dto.getManagerId());
        project.setProjectLeadId(dto.getProjectLeadId());
        project.setBudgets(dto.getBudgets());
        project.setListOfHighlights(dto.getListOfHighlights());
        project.setListOfResources(dto.getListOfResources());
        project.setContractId(dto.getContractId());
        Project saved = projectRepository.save(project);
        return toDTO(saved);
    }

    @Override
    public ProjectDTO getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Project not found with id: " + id));
        return toDTO(project);
    }

    @Override
    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public ProjectLeadDTO assignProjectLead(Long projectId, Long userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException("Project not found with id: " + projectId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found with id: " + userId));
        // Check if this user is already a lead for another project
        ProjectLead existingLead = projectLeadRepository.findByUser_Id(userId);
        if (existingLead != null && (existingLead.getProject() == null || !existingLead.getProject().getId().equals(projectId))) {
            throw new DuplicateResourceException("User is already a lead for another project (projectId: " + existingLead.getProject().getId() + ")");
        }
        ProjectLead projectLead = projectLeadRepository.findByProject_Id(projectId);
        if (projectLead == null) {
            projectLead = new ProjectLead();
        }
        projectLead.setProject(project);
        projectLead.setUser(user);
        ProjectLead savedLead = projectLeadRepository.save(projectLead);
        project.setProjectLeadId(userId);
        projectRepository.save(project);
        return new ProjectLeadDTO(savedLead.getId(), userId, projectId);
    }

    private ProjectDTO toDTO(Project project) {
        return new ProjectDTO(
                project.getId(),
                project.getProjectName(),
                project.getType(),
                project.getDepartment().name(),
                project.getStatus().name(),
                project.getClient().getId(),
                project.getContactPersonId(),
                project.getManagerId(),
                project.getProjectLeadId(),
                project.getBudgets(),
                project.getListOfHighlights(),
                project.getListOfResources(),
                project.getContractId()
        );
    }
} 