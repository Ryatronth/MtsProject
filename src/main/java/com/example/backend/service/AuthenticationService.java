package com.example.backend.service;

import com.example.backend.entity.user.User;
import com.example.backend.entity.user.repository.UserRepository;
import com.example.backend.payload.dto.LoginDTO;
import com.example.backend.payload.response.authResponse.AuthorizationResponse;
import com.example.backend.payload.response.authResponse.InfoResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    private final UserRepository userRepository;

    public AuthorizationResponse login(LoginDTO data) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    data.getUsername(), data.getPassword()
            ));
        } catch (AuthenticationException ex) {
            return new AuthorizationResponse(ResponseStatus.ERROR, ex.getMessage(), null);
        }

        User user = userRepository.findByUsername(data.getUsername()).orElseThrow();

        return new AuthorizationResponse(ResponseStatus.SUCCESS, "Authentication is successful", jwtService.generateToken(user));
    }

    public InfoResponse getInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User user = userRepository.findByUsername(username).orElseThrow();

        return InfoResponse.builder()
                .name(user.getName())
                .surname(user.getSurname())
                .patronymic(user.getPatronymic())
                .phone(user.getPhone())
                .role(user.getRole())
                .imageUrl(user.getImageUrl())
                .build();
    }
}
