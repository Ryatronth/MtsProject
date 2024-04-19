package com.example.backend.entity.user;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Child {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String surname;

    private String patronymic;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "child_group_id")
    private ChildGroup childGroup;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Parent parent;
}
