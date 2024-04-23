package com.example.backend.entity.user;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "child_groups")
public class ChildGroup {
    @Id
    private String id;
}
