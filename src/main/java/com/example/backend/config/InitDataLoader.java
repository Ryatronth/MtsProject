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
            User newUser = new User();

            newUser.setUsername("admin");
            newUser.setPassword(passwordEncoder.encode("admin"));
            newUser.setRole(RoleName.ADMIN);

            newUser.setName("AdminName");
            newUser.setSurname("AdminSurname");
            newUser.setPatronymic("AdminPatronymic");
            newUser.setImageUrl(null);
            newUser.setPhone("88005553535");

            userRepository.save(newUser);
        }
    }
}