package com.example.backend.service;

import com.example.backend.entity.auth.Token;
import com.example.backend.entity.auth.repository.TokenRepository;
import com.example.backend.entity.user.User;
import com.example.backend.entity.user.repository.UserRepository;
import com.example.backend.payload.request.LoginRequest;
import com.example.backend.payload.request.RefreshTokenRequest;
import com.example.backend.payload.response.authResponse.TokenResponse;
import com.example.backend.payload.response.authResponse.InfoResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import jakarta.transaction.Transactional;
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
    private final TokenRepository tokenRepository;

    @Transactional
    public TokenResponse login(LoginRequest data) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    data.getUsername(), data.getPassword()
            ));
        } catch (AuthenticationException ex) {
            return TokenResponse.builder()
                    .status(ResponseStatus.ERROR)
                    .message("Неверные учетные данные")
                    .build();
        }

        User user = userRepository.findByUsername(data.getUsername()).orElseThrow();

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        Token token;
        if (!tokenRepository.existsTokenById(user.getId())) {
            token = Token.builder()
                    .token(refreshToken)
                    .user(user)
                    .build();

            tokenRepository.save(token);
        } else {
            token = tokenRepository.findById(user.getId()).orElseThrow();
            token.setToken(refreshToken);
            tokenRepository.save(token);
        }

        return TokenResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Аутентификация успешна")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public TokenResponse  refreshAccessToken(RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();
        try {
            Token token = tokenRepository.findByToken(refreshToken).orElseThrow(() -> new IllegalArgumentException("Токен не найден"));

            User user = userRepository.findById(token.getId()).orElseThrow(() -> new IllegalArgumentException("Пользователь не найден"));

            String accessToken = jwtService.generateAccessToken(user);

            return TokenResponse.builder()
                    .status(ResponseStatus.SUCCESS)
                    .message("Токен успешно создан")
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();

        } catch (IllegalArgumentException ex) {
            return TokenResponse.builder()
                    .status(ResponseStatus.ERROR)
                    .message(ex.getMessage())
                    .build();
        }
    }

    public TokenResponse refreshTokens(RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();
        try {
            Token token = tokenRepository.findByToken(refreshToken).orElseThrow(() -> new IllegalArgumentException("Токен не найден"));

            User user = userRepository.findById(token.getId()).orElseThrow(() -> new IllegalArgumentException("Пользователь не найден"));

            String accessToken = jwtService.generateAccessToken(user);
            String newRefreshToken = jwtService.generateRefreshToken(user);

            token.setToken(newRefreshToken);
            Token savedToken = tokenRepository.save(token);

            return TokenResponse.builder()
                    .status(ResponseStatus.SUCCESS)
                    .message("Токен успешно создан")
                    .accessToken(accessToken)
                    .refreshToken(savedToken.getToken())
                    .build();

        } catch (IllegalArgumentException ex) {
            return TokenResponse.builder()
                    .status(ResponseStatus.ERROR)
                    .message(ex.getMessage())
                    .build();
        }
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
