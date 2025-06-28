package com.pm.Project_Management_Server.service;

import com.pm.Project_Management_Server.dto.GlobalRateCardDTO;
import com.pm.Project_Management_Server.dto.ProjectRateCardDTO;
import java.util.List;

public interface RateCardService {
    List<GlobalRateCardDTO> getAllGlobalRates();
    List<ProjectRateCardDTO> getProjectRates(Long projectId);
    ProjectRateCardDTO overrideRate(Long projectId, String level, Double rate);
    void initializeProjectRatesFromGlobal(Long projectId);
} 