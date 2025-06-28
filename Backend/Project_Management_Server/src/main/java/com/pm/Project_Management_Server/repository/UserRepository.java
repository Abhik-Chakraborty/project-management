package com.pm.Project_Management_Server.repository;

import com.pm.Project_Management_Server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserName(String userName);
} 