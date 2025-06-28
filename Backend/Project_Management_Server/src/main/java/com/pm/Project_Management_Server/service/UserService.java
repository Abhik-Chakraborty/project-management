package com.pm.Project_Management_Server.service;

import com.pm.Project_Management_Server.dto.UserDTO;
import com.pm.Project_Management_Server.entity.User;
import java.util.List;

public interface UserService {
    UserDTO registerUser(UserDTO userDTO, String rawPassword);
    UserDTO findByUserName(String userName);
    UserDTO findByEmail(String email);
    List<UserDTO> getAllUsers();
} 