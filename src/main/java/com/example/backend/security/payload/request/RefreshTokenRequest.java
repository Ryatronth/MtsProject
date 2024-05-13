package com.example.backend.security.payload.request;

import lombok.Getter;

@Getter
public class RefreshTokenRequest {
    private String refreshToken;
}
