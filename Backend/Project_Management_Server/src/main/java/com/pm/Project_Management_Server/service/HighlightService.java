package com.pm.Project_Management_Server.service;

import com.pm.Project_Management_Server.dto.CreateHighlightDTO;
import com.pm.Project_Management_Server.dto.HighlightResponseDTO;
import java.util.List;

public interface HighlightService {
    HighlightResponseDTO addHighlight(CreateHighlightDTO dto);
    List<HighlightResponseDTO> getHighlightsByProject(Long projectId);
    void deleteHighlight(Long id);
} 