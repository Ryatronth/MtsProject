package com.example.backend.payload.dto;

import com.example.backend.entity.auth.RoleName;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ParentDTO {
    private String username;

    private String password;

    private RoleName role;

    private String imageUrl;

    private String name;

    private String surname;

    private String patronymic;

    private String phone;

    private Set<Long> children;

    public static UserDTO createUserDTO(ParentDTO data) {
        return UserDTO.builder()
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
