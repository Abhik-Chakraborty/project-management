package com.pm.Project_Management_Server.dto;

import com.pm.Project_Management_Server.entity.User.UserType;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String userName;
    private String email;
    private UserType userType;
} 