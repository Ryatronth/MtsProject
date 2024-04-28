package com.example.backend.entity.dish.menu;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "menu_dish")
public class MenuDish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "dish_id")
    private Dish dish;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "current_menu_id")
    private CurrentMenu currentMenu;
}
