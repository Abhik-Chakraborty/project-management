package com.pm.Project_Management_Server.service.impl;

import com.pm.Project_Management_Server.dto.ClientDTO;
import com.pm.Project_Management_Server.dto.CreateClientDTO;
import com.pm.Project_Management_Server.entity.Client;
import com.pm.Project_Management_Server.exception.DuplicateResourceException;
import com.pm.Project_Management_Server.exception.NotFoundException;
import com.pm.Project_Management_Server.repository.ClientRepository;
import com.pm.Project_Management_Server.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {
    private final ClientRepository clientRepository;

    @Override
    public ClientDTO createClient(CreateClientDTO dto) {
        // Validate uniqueness of email
        if (clientRepository.findByEmail(dto.getEmail()) != null) {
            throw new DuplicateResourceException("Client email already exists: " + dto.getEmail());
        }
        Client client = new Client();
        client.setName(dto.getName());
        client.setEmail(dto.getEmail());
        client.setOnBoardedOn(dto.getOnBoardedOn());
        client.setClientRating(dto.getClientRating());
        Client saved = clientRepository.save(client);
        return toDTO(saved);
    }

    @Override
    public ClientDTO getClientById(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Client not found with id: " + id));
        return toDTO(client);
    }

    @Override
    public List<ClientDTO> getAllClients() {
        return clientRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public ClientDTO getClientByEmail(String email) {
        Client client = clientRepository.findByEmail(email);
        if (client == null) throw new NotFoundException("Client not found with email: " + email);
        return toDTO(client);
    }

    private ClientDTO toDTO(Client client) {
        return new ClientDTO(
                client.getId(),
                client.getName(),
                client.getEmail(),
                client.getOnBoardedOn(),
                client.getClientRating()
        );
    }
} 