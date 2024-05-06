package com.example.backend.payload.dto;

import com.example.backend.entity.dish.menu.Dish;
import com.example.backend.entity.user.Child;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChildDishDTO {
    private Child child;
    private List<Dish> dishes;
}
