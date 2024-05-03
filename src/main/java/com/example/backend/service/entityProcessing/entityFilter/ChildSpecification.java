package com.example.backend.service.entityProcessing.entityFilter;

import com.example.backend.entity.user.Child;
import com.example.backend.entity.user.ChildGroup;
import com.example.backend.entity.user.Parent;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;


public class ChildSpecification {
    public static Specification<Child> filterByCriteria(Object... values) {
        return FilterProcessor.createSpec((key, value, root, builder) ->
                switch (key) {
                    case "id" -> builder.equal(root.get(key), value);
                    case "childGroup" -> {
                        Join<Child, ChildGroup> childGroupJoin = root.join("childGroup");
                        yield builder.equal(childGroupJoin.get("id"), value);
                    }
                    case "parent" -> {
                        Join<Child, Parent> childParentJoin = root.join("parent");
                        yield builder.equal(childParentJoin.get("id"), value);
                    }
                    case "unlinked" -> builder.isNull(root.get("parent"));
                    default -> builder.like(builder.lower(root.get(key)), "%" + value.toString().toLowerCase() + "%");
                }, values);
    }
}