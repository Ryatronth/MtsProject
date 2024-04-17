package com.example.backend.payload.response.authResponse;

import com.example.backend.entity.auth.RoleName;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InfoResponse {
    private String name;
    private String surname;
    private String patronymic;
    private String imageUrl;
    private String phone;
    private RoleName role;
}
