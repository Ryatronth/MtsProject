package com.example.backend.entity.order.menu;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

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

    private DishType type;

    private Double price;

    private String imageUrl;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "current_menu_id")
    private CurrentMenu currentMenu;
}
