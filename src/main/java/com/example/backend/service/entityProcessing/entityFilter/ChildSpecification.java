package com.example.backend.service.entityProcessing.entityFilter;

import com.example.backend.controller.exception.customException.FilterException;
import com.example.backend.entity.user.Child;
import com.example.backend.entity.user.ChildGroup;
import com.example.backend.entity.user.Parent;
import com.example.backend.payload.dto.SearchDTO;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;


public class ChildSpecification {
    public static Specification<Child> filterByCriteria(List<SearchDTO> filters) {
        return (root, query, builder) -> {
            try {
                List<Predicate> predicates = new ArrayList<>();
                for (SearchDTO filter : filters) {
                    switch (filter.getOperation()) {
                        case EQUAL -> {
                            String key = filter.getKey();
                            Object value = filter.getValue();
                            if ("childGroup".equals(key)) {
                                Join<Child, ChildGroup> childGroupJoin = root.join("childGroup");
                                predicates.add(builder.equal(childGroupJoin.get("id"), value));
                            } else if ("parent".equals(key)) {
                                if (value == null) {
                                    predicates.add(builder.isNull(root.get("parent")));
                                } else {
                                    Join<Child, Parent> childParentJoin = root.join("parent");
                                    predicates.add(builder.equal(childParentJoin.get("id"), value));
                                }
                            } else {
                                predicates.add(builder.equal(root.get(filter.getKey()), filter.getValue()));
                            }
                        }
                        case LIKE -> predicates.add(builder.like(builder.lower(root.get(filter.getKey())), "%" + filter.getValue() + "%"));
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
