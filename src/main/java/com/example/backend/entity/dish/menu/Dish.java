package com.example.backend.entity.dish.menu;

import com.example.backend.entity.dish.Category;
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
@Table(name = "dishes")
public class Dish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String composition;

    @Enumerated(EnumType.STRING)
    private Category category;

    private Double price;

    private String imageUrl;

    @JsonIgnore
    @OneToMany(mappedBy = "dish")
    private Set<MenuDish> menuDishes;
}
