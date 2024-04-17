package com.example.backend.entity.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "child_groups")
public class ChildGroup {
    @Id
    private String id;

    @ManyToOne
    @JoinColumn(name = "worker_id")
    private Worker worker;
}
