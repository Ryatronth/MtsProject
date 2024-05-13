package com.example.backend.security.controller;

import com.example.backend.security.payload.request.LoginRequest;
import com.example.backend.security.payload.request.RefreshTokenRequest;
import com.example.backend.security.service.AuthenticationService;
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
        return ResponseEntity.ok(authenticationService.login(data));
    }

    @PostMapping("/refresh/access")
    public ResponseEntity<?> refreshAccess(@RequestBody RefreshTokenRequest data) {
        return ResponseEntity.ok(authenticationService.refreshAccessToken(data));
    }

    @GetMapping("/info")
    public ResponseEntity<?> getUserInfo() {
        return ResponseEntity.ok(authenticationService.getInfo());
    }
}
