package com.example.backend.payload.dto;

import com.example.backend.entity.auth.RoleName;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
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
