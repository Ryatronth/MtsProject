package com.example.backend.entity.notification;

import com.example.backend.entity.user.User;
import jakarta.persistence.*;
import lombok.*;

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

    private String date;

    private String time;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
