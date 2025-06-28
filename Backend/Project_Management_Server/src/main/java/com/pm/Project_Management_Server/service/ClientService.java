package com.pm.Project_Management_Server.service;

import com.pm.Project_Management_Server.dto.ClientDTO;
import com.pm.Project_Management_Server.dto.CreateClientDTO;
import java.util.List;

public interface ClientService {
    ClientDTO createClient(CreateClientDTO dto);
    ClientDTO getClientById(Long id);
    List<ClientDTO> getAllClients();
    ClientDTO getClientByEmail(String email);
} 