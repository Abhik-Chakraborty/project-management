package com.pm.Project_Management_Server.service;

import com.pm.Project_Management_Server.dto.ContactPersonDTO;
import java.util.List;

public interface ContactPersonService {
    ContactPersonDTO createContactPerson(ContactPersonDTO dto);
    ContactPersonDTO getContactPersonById(Long id);
    List<ContactPersonDTO> getAllContactPersons();
    List<ContactPersonDTO> getContactPersonsByProjectId(Long projectId);
} 