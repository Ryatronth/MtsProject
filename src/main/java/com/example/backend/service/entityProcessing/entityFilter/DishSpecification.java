package com.example.backend.service.entityProcessing.entityFilter;

import com.example.backend.entity.dish.menu.Dish;
import org.springframework.data.jpa.domain.Specification;

public class DishSpecification {
    public static Specification<Dish> filterByCriteria(Object... values) {
        return FilterProcessor.createSpec((key, value, root, builder) ->
                switch (key) {
                    case "id" -> builder.equal(root.get(key), value);
                    case "priceFrom" -> builder.greaterThanOrEqualTo(root.get("price"), (Double) value);
                    case "priceTo" -> builder.lessThanOrEqualTo(root.get("price"), (Double) value);
                    default -> builder.like(builder.lower(root.get(key)), "%" + value.toString().toLowerCase() + "%");
                }, values);
    }
}
