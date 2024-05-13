package com.example.backend.security.entity;

import com.example.backend.dining.entity.user.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Token {
    @Id
    @GeneratedValue
    public Long id;

    @Column(unique = true)
    public String token;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @MapsId
    public User user;
}
