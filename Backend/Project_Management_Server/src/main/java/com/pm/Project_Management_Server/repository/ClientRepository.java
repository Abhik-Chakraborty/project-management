package com.pm.Project_Management_Server.repository;

import com.pm.Project_Management_Server.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
    Client findByEmail(String email);
} 