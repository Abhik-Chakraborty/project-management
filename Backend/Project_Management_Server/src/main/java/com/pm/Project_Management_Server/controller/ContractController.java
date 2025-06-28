package com.pm.Project_Management_Server.controller;

import com.pm.Project_Management_Server.dto.ContractDTO;
import com.pm.Project_Management_Server.dto.ContractResponseDTO;
import com.pm.Project_Management_Server.service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contracts")
@RequiredArgsConstructor
public class ContractController {
    private final ContractService contractService;

    @PostMapping
    public ResponseEntity<ContractResponseDTO> createContract(@RequestBody ContractDTO dto) {
        ContractResponseDTO created = contractService.createContract(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<ContractResponseDTO>> getContractsByProject(@PathVariable Long projectId) {
        return ResponseEntity.ok(contractService.getContractsByProject(projectId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContractResponseDTO> updateContractAmount(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        Double newAmount = Double.valueOf(body.get("amount").toString());
        ContractResponseDTO updated = contractService.updateContractAmount(id, newAmount);
        return ResponseEntity.ok(updated);
    }
} 