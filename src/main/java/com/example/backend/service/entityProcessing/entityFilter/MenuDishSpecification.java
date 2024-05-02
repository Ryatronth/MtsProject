package com.example.backend.service.entityProcessing.entityFilter;

import com.example.backend.controller.exception.customException.FilterException;
import com.example.backend.entity.dish.menu.CurrentMenu;
import com.example.backend.entity.dish.menu.Dish;
import com.example.backend.entity.dish.menu.MenuDish;
import com.example.backend.payload.dto.SearchDTO;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class MenuDishSpecification {
    public static Specification<MenuDish> filterByCriteria(List<SearchDTO> filters) {
        return (root, query, builder) -> {
            try {
                List<Predicate> predicates = new ArrayList<>();
                for (SearchDTO filter : filters) {
                    switch (filter.getOperation()) {
                        case EQUAL -> {
                            Join<MenuDish, CurrentMenu> menuJoin = root.join("currentMenu");
                            predicates.add(builder.equal(menuJoin.get("id"), filter.getValue()));
                        }
                        case NOT_EQUAL -> {
                            Join<MenuDish, Dish> menuDishDishJoin = root.join("dish");
                            predicates.add(builder.notEqual(menuDishDishJoin.get("id"), filter.getValue()));
                        }
                        case NOT_IN -> {
                            Join<MenuDish, Dish> menuDishDishJoin = root.join("dish");
                            List<Long> values = ((List<Integer>) filter.getValue()).stream()
                                    .map(Long::valueOf)
                                    .collect(Collectors.toList());
                            predicates.add(menuDishDishJoin.get("id").as(Long.class).in(values).not());
                        }
                        default -> throw new FilterException("Неверное значение операции");
                    }
                }
                return builder.and(predicates.toArray(new Predicate[0]));
            } catch (Exception ex) {
                throw new FilterException(ex.getMessage());
            }
        };
    }
}
