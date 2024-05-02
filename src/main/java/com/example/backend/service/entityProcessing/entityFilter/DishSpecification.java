package com.example.backend.service.entityProcessing.entityFilter;

import com.example.backend.controller.exception.customException.FilterException;
import com.example.backend.entity.dish.menu.Dish;
import com.example.backend.payload.dto.SearchDTO;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class DishSpecification {
    public static Specification<Dish> filterByCriteria(List<SearchDTO> filters) {
        return (root, query, builder) -> {
            try {
                List<Predicate> predicates = new ArrayList<>();
                for (SearchDTO filter : filters) {
                    switch (filter.getOperation()) {
                        case EQUAL -> predicates.add(builder.equal(root.get(filter.getKey()), filter.getValue()));
                        case LIKE -> predicates.add(builder.like(root.get(filter.getKey()), "%" + filter.getValue() + "%"));
                        case LESS_THAN_EQUAL -> predicates.add(builder.lessThanOrEqualTo(root.get(filter.getKey()), (Double) filter.getValue()));
                        case GREATER_THAN_EQUAL -> predicates.add(builder.greaterThanOrEqualTo(root.get(filter.getKey()), (Double) filter.getValue()));
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
