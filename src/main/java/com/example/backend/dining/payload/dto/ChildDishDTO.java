package com.example.backend.dining.payload.dto;

import com.example.backend.dining.entity.dish.menu.Dish;
import com.example.backend.dining.entity.user.Child;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChildDishDTO {
    private Child child;
    private List<Dish> dishes;
}
