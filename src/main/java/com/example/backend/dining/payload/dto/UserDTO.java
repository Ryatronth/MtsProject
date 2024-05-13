package com.example.backend.dining.payload.dto;

import com.example.backend.security.entity.RoleName;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
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
