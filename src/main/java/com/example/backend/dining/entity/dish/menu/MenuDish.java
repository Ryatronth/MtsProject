package com.example.backend.dining.entity.dish.menu;

import com.example.backend.dining.entity.dish.order.OrderMenu;
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

    @JsonIgnore
    @OneToMany(mappedBy = "menuDish")
    private Set<OrderMenu> orderMenu;
}
