package com.pm.Project_Management_Server.controller;

import com.pm.Project_Management_Server.dto.ContactPersonDTO;
import com.pm.Project_Management_Server.service.ContactPersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact-persons")
@RequiredArgsConstructor
public class ContactPersonController {
    private final ContactPersonService contactPersonService;

    @PostMapping
    public ResponseEntity<ContactPersonDTO> createContactPerson(@RequestBody ContactPersonDTO dto) {
        ContactPersonDTO created = contactPersonService.createContactPerson(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ContactPersonDTO>> getContactPersons(@RequestParam(value = "projectId", required = false) Long projectId) {
        if (projectId != null) {
            return ResponseEntity.ok(contactPersonService.getContactPersonsByProjectId(projectId));
        } else {
            return ResponseEntity.ok(contactPersonService.getAllContactPersons());
        }
    }
} 