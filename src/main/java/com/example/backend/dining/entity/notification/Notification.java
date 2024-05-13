package com.example.backend.dining.entity.notification;

import com.example.backend.dining.entity.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

    private LocalDate date;

    private LocalTime time;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
