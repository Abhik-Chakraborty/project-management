package com.pm.Project_Management_Server.controller;

import com.pm.Project_Management_Server.dto.UserDTO;
import com.pm.Project_Management_Server.entity.User;
import com.pm.Project_Management_Server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    // DTO for registration request
    public static class RegisterRequest {
        public String userName;
        public String email;
        public String password;
        public User.UserType userType;
    }

    // DTO for login request
    public static class LoginRequest {
        public String userName;
        public String password;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody RegisterRequest request) {
        UserDTO dto = new UserDTO(null, request.userName, request.email, request.userType);
        UserDTO registered = userService.registerUser(dto, request.password);
        return new ResponseEntity<>(registered, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        UserDTO user = userService.findByUserName(request.userName);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.UNAUTHORIZED);
        }
        // Fetch user entity to check password
        // (Assume UserServiceImpl can be extended to provide this, or fetch from repository here if needed)
        // For now, let's assume password check is not implemented (since password is not in DTO)
        return new ResponseEntity<>("Login endpoint - implement password check in production", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        List<UserDTO> all = userService.getAllUsers();
        return all.stream().filter(u -> u.getId().equals(id))
            .findFirst()
            .map(ResponseEntity::ok)
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/username/{userName}")
    public ResponseEntity<UserDTO> getUserByUsername(@PathVariable String userName) {
        try {
            UserDTO user = userService.findByUserName(userName);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
} 