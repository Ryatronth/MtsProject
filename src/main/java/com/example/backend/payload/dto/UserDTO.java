package com.example.backend.payload.dto;

import com.example.backend.entity.auth.RoleName;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String username;

    private String password;

    private RoleName role;

    private String imageUrl;

    private String name;

    private String surname;

    private String patronymic;

    private String phone;

    public static ParentDTO createParentDTO(UserDTO data) {
        return ParentDTO.builder()
                .username(data.getUsername())
                .password(data.getPassword())
                .role(data.getRole())
                .name(data.getName())
                .surname(data.getSurname())
                .patronymic(data.getPatronymic())
                .phone(data.getPhone())
                .build();
    }
}
