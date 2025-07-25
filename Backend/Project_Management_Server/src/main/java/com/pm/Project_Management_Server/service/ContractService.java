package com.pm.Project_Management_Server.service;

import com.pm.Project_Management_Server.dto.ContractDTO;
import com.pm.Project_Management_Server.dto.ContractResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface ContractService {
    ContractResponseDTO createContract(ContractDTO dto);
    List<ContractResponseDTO> getContractsByProject(Long projectId);
    ContractResponseDTO updateContractAmount(Long contractId, Double newAmount);
} 