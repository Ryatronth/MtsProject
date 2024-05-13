package com.example.backend.security.payload.request;

import lombok.Getter;

@Getter
public class LoginRequest {
    private String username;
    private String password;

    @Override
    public String toString() {
        return "LoginRequest{" + "username='" + username + '\'' + '}';
    }
}
