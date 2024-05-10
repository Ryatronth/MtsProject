package com.example.backend.service.entityProcessing.entityFilter;

import com.example.backend.entity.dish.menu.Dish;
import org.springframework.data.jpa.domain.Specification;

import java.util.HashSet;
import java.util.Set;

public class DishSpecification {
    public static Specification<Dish> filterByCriteria(Object... values) {
        return FilterProcessor.createSpec((key, value, root, builder) ->
                switch (key) {
                    case "id", "isRemoved" -> builder.equal(root.get(key), value);
                    case "priceFrom" -> builder.greaterThanOrEqualTo(root.get("price"), (Double) value);
                    case "priceTo" -> builder.lessThanOrEqualTo(root.get("price"), (Double) value);
                    case "exclude" -> {
                        Set<Long> val = new HashSet<>((Set<Long>) value);
                        yield root.get("id").in(val).not();
                    }
                    default -> builder.like(builder.lower(root.get(key)), "%" + value.toString().toLowerCase() + "%");
                }, values);
    }
}
