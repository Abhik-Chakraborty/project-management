package com.pm.Project_Management_Server.service;

import com.pm.Project_Management_Server.dto.CreateResourceDTO;
import com.pm.Project_Management_Server.entity.Resource;
import java.util.List;

public interface ResourceService {
    Resource addResource(CreateResourceDTO dto);
    List<Resource> getResourcesByProject(Long projectId);
    boolean validateAllocation(int allocationPercentage);
} 