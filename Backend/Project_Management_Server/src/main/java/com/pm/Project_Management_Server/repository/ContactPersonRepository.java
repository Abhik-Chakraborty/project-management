package com.pm.Project_Management_Server.repository;

import com.pm.Project_Management_Server.entity.ContactPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContactPersonRepository extends JpaRepository<ContactPerson, Long> {
    List<ContactPerson> findAllByProjectId(Long projectId);
} 