package com.example.backend.dining.entity.user;

import com.example.backend.dining.entity.dish.order.Order;
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

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Parent parent;

    @JsonIgnore
    @OneToMany(mappedBy = "child", cascade = CascadeType.REMOVE)
    private Set<Order> orders;
}
