package com.example.backend.service.entityProcessing.entityFilter;

import com.example.backend.controller.exception.customException.FilterException;
import com.example.backend.entity.user.Child;
import com.example.backend.entity.user.ChildGroup;
import com.example.backend.entity.user.Parent;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


public class ChildSpecification {
    public static Specification<Child> filterByCriteria(Map<String, Object> filters) {
        return (root, query, builder) -> {
            try {
                List<Predicate> predicates = new ArrayList<>();
                for (Map.Entry<String, Object> entry : filters.entrySet()) {
                    String key = entry.getKey();
                    Object value = entry.getValue();
                    switch (key) {
                        case "id" -> predicates.add(builder.equal(root.get(key), value));
                        case "childGroup" -> {
                            Join<Child, ChildGroup> childGroupJoin = root.join("childGroup");
                            predicates.add(builder.equal(childGroupJoin.get("id"), value));
                        }
                        case "parent" -> {
                            Join<Child, Parent> childParentJoin = root.join("parent");
                            predicates.add(builder.equal(childParentJoin.get("id"), value));
                        }
                        case "unlinked" -> predicates.add(builder.isNull(root.get("parent")));
                        default -> predicates.add(builder.like(builder.lower(root.get(key)),
                                "%" + value.toString().toLowerCase() + "%"));
                    }
                }

                return builder.and(predicates.toArray(new Predicate[0]));
            } catch (Exception ex) {
                throw new FilterException(ex.getMessage());
            }
        };
    }
}
