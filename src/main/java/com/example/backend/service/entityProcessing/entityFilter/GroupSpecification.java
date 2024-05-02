package com.example.backend.service.entityProcessing.entityFilter;

import com.example.backend.controller.exception.customException.FilterException;
import com.example.backend.entity.user.ChildGroup;
import com.example.backend.payload.dto.SearchDTO;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class GroupSpecification {
    public static Specification<ChildGroup> filterByCriteria(List<SearchDTO> filters) {
        return (root, query, builder) -> {
            try {
                List<Predicate> predicates = new ArrayList<>();
                for (SearchDTO filter : filters) {
                    switch (filter.getOperation()) {
                        case EQUAL -> predicates.add(builder.equal(root.get(filter.getKey()), filter.getValue()));
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
