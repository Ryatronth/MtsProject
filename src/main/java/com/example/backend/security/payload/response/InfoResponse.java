package com.example.backend.security.payload.response;

import com.example.backend.security.entity.RoleName;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class InfoResponse {
    private String name;
    private String surname;
    private String patronymic;
    private String imageUrl;
    private String phone;
    private RoleName role;
}
