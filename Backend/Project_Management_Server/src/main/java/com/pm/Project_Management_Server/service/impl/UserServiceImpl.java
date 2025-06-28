package com.pm.Project_Management_Server.service.impl;

import com.pm.Project_Management_Server.dto.UserDTO;
import com.pm.Project_Management_Server.entity.User;
import com.pm.Project_Management_Server.exception.DuplicateResourceException;
import com.pm.Project_Management_Server.exception.NotFoundException;
import com.pm.Project_Management_Server.repository.UserRepository;
import com.pm.Project_Management_Server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDTO registerUser(UserDTO userDTO, String rawPassword) {
        // Validate uniqueness of username and email
        if (userRepository.findByUserName(userDTO.getUserName()) != null) {
            throw new DuplicateResourceException("Username already exists: " + userDTO.getUserName());
        }
        if (userRepository.findAll().stream().anyMatch(u -> u.getEmail().equalsIgnoreCase(userDTO.getEmail()))) {
            throw new DuplicateResourceException("Email already exists: " + userDTO.getEmail());
        }
        User user = new User();
        user.setUserName(userDTO.getUserName());
        user.setEmail(userDTO.getEmail());
        user.setUserType(userDTO.getUserType());
        user.setPassword(passwordEncoder.encode(rawPassword));
        User saved = userRepository.save(user);
        return toDTO(saved);
    }

    @Override
    public UserDTO findByUserName(String userName) {
        User user = userRepository.findByUserName(userName);
        if (user == null) throw new NotFoundException("User not found with username: " + userName);
        return toDTO(user);
    }

    @Override
    public UserDTO findByEmail(String email) {
        User user = userRepository.findAll().stream()
            .filter(u -> u.getEmail().equalsIgnoreCase(email))
            .findFirst().orElse(null);
        if (user == null) throw new NotFoundException("User not found with email: " + email);
        return toDTO(user);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    private UserDTO toDTO(User user) {
        return new UserDTO(user.getId(), user.getUserName(), user.getEmail(), user.getUserType());
    }
} 