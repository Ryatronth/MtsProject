package com.example.backend.payload.request;

import lombok.Getter;

@Getter
public class RefreshTokenRequest {
    private String accessToken;
    private String refreshToken;
}
