package com.example.backend.controller;

import com.example.backend.payload.request.LoginRequest;
import com.example.backend.payload.request.RefreshTokenRequest;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import com.example.backend.payload.response.authResponse.TokenResponse;
import com.example.backend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest data) {
        TokenResponse response = authenticationService.login(data);
        if (response.getStatus() == ResponseStatus.SUCCESS) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body(response);
    }

    @PostMapping("/refresh/access")
    public ResponseEntity<?> refreshAccess(@RequestBody RefreshTokenRequest data) {
        TokenResponse response = authenticationService.refreshAccessToken(data);
        if (response.getStatus() == ResponseStatus.SUCCESS) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(404).body(response);
    }

    @PostMapping("/refresh/all")
    public ResponseEntity<?> refreshTokens(@RequestBody RefreshTokenRequest data) {
        TokenResponse response = authenticationService.refreshTokens(data);
        if (response.getStatus() == ResponseStatus.SUCCESS) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(404).body(response);
    }

    @GetMapping("/info")
    public ResponseEntity<?> getUserInfo() {
        return ResponseEntity.ok(authenticationService.getInfo());
    }
}
