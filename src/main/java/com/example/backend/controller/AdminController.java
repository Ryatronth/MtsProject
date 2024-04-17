package com.example.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/user/admin")
public class AdminController {
    @GetMapping
    public ResponseEntity<?> getAdminInfo(Principal connectedUser) {
        return ResponseEntity.ok(connectedUser.getName());
    }
}
