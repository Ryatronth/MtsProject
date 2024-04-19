package com.example.backend.payload.response.authResponse;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class TokenResponse {
    private ResponseStatus status;
    private String message;
    private String accessToken;
    private String refreshToken;
}
