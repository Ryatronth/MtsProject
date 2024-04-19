package com.example.backend.config;

import com.example.backend.entity.auth.RoleName;
import com.example.backend.entity.user.User;
import com.example.backend.entity.user.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@AllArgsConstructor
public class InitDataLoader {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        Optional<User> user = userRepository.findByUsername("admin");
        if (user.isEmpty()) {
            User admin = User.builder()
                    .name("AdminName")
                    .surname("AdminSurname")
                    .patronymic("AdminPatronymic")
                    .phone("88005553535")
                    .imageUrl(null)
                    .username("admin")
                    .password(passwordEncoder.encode("admin"))
                    .role(RoleName.ADMIN)
                    .build();

            userRepository.save(admin);
        }
    }
}