 package com.pm.Project_Management_Server.service;

import com.pm.Project_Management_Server.dto.OpenPositionDTO;
import java.util.List;

public interface OpenPositionService {
    List<OpenPositionDTO> calculateOpenPositions(Long projectId);
    List<OpenPositionDTO> getOpenPositionsByProject(Long projectId);
    void syncOpenPositionsWithResourceState(Long projectId); // optional
}
