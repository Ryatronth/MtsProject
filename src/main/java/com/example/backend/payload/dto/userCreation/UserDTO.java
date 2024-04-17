package com.example.backend.payload.dto.userCreation;

import com.example.backend.entity.auth.RoleName;
import lombok.Data;

@Data
public class UserDTO {
    private String username;

    private String password;

    private RoleName role;

    private String imageUrl;

    private String name;

    private String surname;

    private String patronymic;

    private String phone;
}
