package com.example.backend.security.entity.repository;

import com.example.backend.security.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    boolean existsTokenById(long id);
    Optional<Token> findByToken(String token);
}
