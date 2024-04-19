package com.example.backend.entity.auth;

import com.example.backend.entity.user.User;
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
