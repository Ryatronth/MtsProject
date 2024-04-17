package com.example.backend.controller;

import com.example.backend.payload.dto.LoginDTO;
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
    public ResponseEntity<?> login(@RequestBody LoginDTO data) {
        return ResponseEntity.ok(authenticationService.login(data));
    }

    @GetMapping("/info")
    public ResponseEntity<?> getUserInfo() {
        return ResponseEntity.ok(authenticationService.getInfo());
    }
}
