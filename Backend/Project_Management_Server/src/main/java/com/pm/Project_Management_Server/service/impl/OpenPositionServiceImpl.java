package com.pm.Project_Management_Server.service.impl;

import com.pm.Project_Management_Server.dto.OpenPositionDTO;
import com.pm.Project_Management_Server.entity.OpenPosition;
import com.pm.Project_Management_Server.repository.OpenPositionRepository;
import com.pm.Project_Management_Server.service.OpenPositionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OpenPositionServiceImpl implements OpenPositionService {
    private final OpenPositionRepository openPositionRepository;

    @Override
    public List<OpenPositionDTO> calculateOpenPositions(Long projectId) {
        // For now, just return all open positions for the project
        return getOpenPositionsByProject(projectId);
    }

    @Override
    public List<OpenPositionDTO> getOpenPositionsByProject(Long projectId) {
        List<OpenPosition> positions = openPositionRepository.findAllByProject_Id(projectId);
        return positions.stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public void syncOpenPositionsWithResourceState(Long projectId) {
        // No-op for now
    }

    private OpenPositionDTO toDTO(OpenPosition op) {
        return new OpenPositionDTO(
                op.getId(),
                op.getProject().getId(),
                op.getLevel().name(),
                op.getNumberRequired()
        );
    }
} 