package com.example.backend.entity.order.menu;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
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

    private DishType type;

    private Double price;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "current_menu_id")
    private CurrentMenu currentMenu;
}
