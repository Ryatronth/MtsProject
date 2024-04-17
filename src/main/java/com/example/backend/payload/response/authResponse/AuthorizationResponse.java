package com.example.backend.payload.response.authResponse;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthorizationResponse {
    private ResponseStatus status;
    private String message;
    private String token;
}
