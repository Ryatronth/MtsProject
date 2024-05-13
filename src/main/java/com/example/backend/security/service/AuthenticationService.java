package com.example.backend.security.service;

import com.example.backend.security.controller.exception.customException.LoginException;
import com.example.backend.security.controller.exception.customException.RefreshException;
import com.example.backend.security.entity.Token;
import com.example.backend.security.entity.repository.TokenRepository;
import com.example.backend.dining.entity.user.User;
import com.example.backend.dining.entity.user.repository.UserRepository;
import com.example.backend.security.payload.request.LoginRequest;
import com.example.backend.security.payload.request.RefreshTokenRequest;
import com.example.backend.security.payload.response.TokenResponse;
import com.example.backend.security.payload.response.InfoResponse;
import com.example.backend.totalPayload.enums.ResponseStatus;
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
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(data.getUsername(), data.getPassword()));
        } catch (AuthenticationException ex) {
            throw new LoginException("Неверные учетные данные");
        }

        User user = userRepository.findByUsername(data.getUsername()).orElseThrow();

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        refreshTokens(user, refreshToken);

        return TokenResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Аутентификация успешна")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    private void refreshTokens(User user, String refreshToken) {
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
    }

    public TokenResponse refreshAccessToken(RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();
        Token token = tokenRepository.findByToken(refreshToken).orElseThrow(() -> new RefreshException("Токен не найден"));

        User user = userRepository.findById(token.getId()).orElseThrow(() -> new RefreshException("Пользователь не найден"));

        String accessToken = jwtService.generateAccessToken(user);

        return TokenResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Токен успешно создан")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
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
