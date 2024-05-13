package com.example.backend.dining.config;

import com.example.backend.dining.entity.user.User;
import com.example.backend.dining.entity.user.repository.UserRepository;
import com.example.backend.security.entity.RoleName;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class InitDataLoader {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        Optional<User> admin = userRepository.findByUsername("admin");
        if (admin.isEmpty()) {
            User user = User.builder()
                    .name("AdminName")
                    .surname("AdminSurname")
                    .patronymic("AdminPatronymic")
                    .phone("88005553535")
                    .imageUrl(null)
                    .username("admin")
                    .password(passwordEncoder.encode("admin"))
                    .role(RoleName.ADMIN)
                    .build();

            userRepository.save(user);
        }

        Optional<User> worker = userRepository.findByUsername("worker");
        if (worker.isEmpty()) {
            User user = User.builder()
                    .name("WorkerName")
                    .surname("WorkerSurname")
                    .patronymic("WorkerPatronymic")
                    .phone("88005553535")
                    .imageUrl(null)
                    .username("worker")
                    .password(passwordEncoder.encode("worker"))
                    .role(RoleName.WORKER)
                    .build();

            userRepository.save(user);
        }
    }
}