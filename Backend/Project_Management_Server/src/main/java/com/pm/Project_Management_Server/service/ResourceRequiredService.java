package com.pm.Project_Management_Server.service;

import com.pm.Project_Management_Server.dto.ResourceRequiredDTO;
import java.util.List;

public interface ResourceRequiredService {
    ResourceRequiredDTO addResourceRequirement(ResourceRequiredDTO dto);
    List<ResourceRequiredDTO> getRequirementsForProject(Long projectId);
    String autoPopulateExpRange(String level); // optional logic
} 