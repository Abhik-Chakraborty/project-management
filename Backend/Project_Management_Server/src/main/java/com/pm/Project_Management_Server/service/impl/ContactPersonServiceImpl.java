package com.pm.Project_Management_Server.service.impl;

import com.pm.Project_Management_Server.dto.ContactPersonDTO;
import com.pm.Project_Management_Server.entity.ContactPerson;
import com.pm.Project_Management_Server.exception.NotFoundException;
import com.pm.Project_Management_Server.repository.ContactPersonRepository;
import com.pm.Project_Management_Server.service.ContactPersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContactPersonServiceImpl implements ContactPersonService {
    private final ContactPersonRepository contactPersonRepository;

    @Override
    public ContactPersonDTO createContactPerson(ContactPersonDTO dto) {
        ContactPerson contact = new ContactPerson();
        contact.setName(dto.getName());
        contact.setEmail(dto.getEmail());
        contact.setProjectId(dto.getProjectId());
        ContactPerson saved = contactPersonRepository.save(contact);
        return toDTO(saved);
    }

    @Override
    public ContactPersonDTO getContactPersonById(Long id) {
        ContactPerson contact = contactPersonRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("ContactPerson not found with id: " + id));
        return toDTO(contact);
    }

    @Override
    public List<ContactPersonDTO> getAllContactPersons() {
        return contactPersonRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<ContactPersonDTO> getContactPersonsByProjectId(Long projectId) {
        return contactPersonRepository.findAllByProjectId(projectId)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    private ContactPersonDTO toDTO(ContactPerson contact) {
        return new ContactPersonDTO(
                contact.getId(),
                contact.getName(),
                contact.getEmail(),
                contact.getProjectId()
        );
    }
} 