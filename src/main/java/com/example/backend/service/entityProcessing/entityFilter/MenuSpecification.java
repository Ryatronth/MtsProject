package com.example.backend.service.entityProcessing.entityFilter;

import com.example.backend.controller.exception.customException.FilterException;
import com.example.backend.entity.dish.menu.CurrentMenu;
import com.example.backend.payload.dto.SearchDTO;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class MenuSpecification {
    public static Specification<CurrentMenu> filterByCriteria(List<SearchDTO> filters) {
        return (root, query, builder) -> {
            try {
                List<Predicate> predicates = new ArrayList<>();
                for (SearchDTO filter : filters) {
                    LocalDate date = LocalDate.parse(filter.getValue().toString(), DateTimeFormatter.ofPattern("yyyy-M-dd"));
                    switch (filter.getOperation()) {
                        case EQUAL -> predicates.add(builder.equal(root.get(filter.getKey()), filter.getValue()));
                        case LESS_THAN_EQUAL -> predicates.add(builder.lessThanOrEqualTo(root.get(filter.getKey()), date));
                        case GREATER_THAN_EQUAL -> predicates.add(builder.greaterThanOrEqualTo(root.get(filter.getKey()), date));
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
