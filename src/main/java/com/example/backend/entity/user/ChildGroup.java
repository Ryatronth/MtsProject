package com.example.backend.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

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

    @JsonIgnore
    @OneToMany(mappedBy = "childGroup", cascade = CascadeType.REMOVE)
    private Set<Child> children;
}
