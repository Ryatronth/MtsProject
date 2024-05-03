package com.example.backend.service.entityProcessing.entityFilter;

import com.example.backend.controller.exception.customException.FilterException;
import com.example.backend.entity.dish.menu.Dish;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class DishSpecification {
    public static Specification<Dish> filterByCriteria(Map<String, Object> filters) {
        return (root, query, builder) -> {
            try {
                List<Predicate> predicates = new ArrayList<>();
                for (Map.Entry<String, Object> entry : filters.entrySet()) {
                    String key = entry.getKey();
                    Object value = entry.getValue();
                    switch (key) {
                        case "id" -> predicates.add(builder.equal(root.get(key), value));
                        case "priceFrom" -> predicates.add(builder.greaterThanOrEqualTo(root.get("price"), (Double) value));
                        case "priceTo" -> predicates.add(builder.lessThanOrEqualTo(root.get("price"), (Double) value));
                        default -> predicates.add(builder.like(builder.lower(root.get(key)), "%" + value.toString().toLowerCase() + "%"));
                    }
                }

                return builder.and(predicates.toArray(new Predicate[0]));
            } catch (Exception ex) {
                throw new FilterException(ex.getMessage());
            }
        };
    }
}
