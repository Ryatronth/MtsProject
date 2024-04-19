package com.example.backend.entity.auth.repository;

import com.example.backend.entity.auth.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    boolean existsTokenById(long id);
    Optional<Token> findByToken(String token);
}
