package com.example.backend.entity.auth;

import com.example.backend.entity.user.User;
import jakarta.persistence.*;

@Entity
public class Token {
    @Id
    @GeneratedValue
    public Integer id;

    @Column(unique = true)
    public String token;

    public boolean revoked;

    public boolean expired;

    @ManyToOne
    @JoinColumn(name = "user_id")
    public User user;
}
