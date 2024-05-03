package com.example.backend.service.entityProcessing.entityFilter;

import com.example.backend.entity.user.ChildGroup;
import org.springframework.data.jpa.domain.Specification;

public class GroupSpecification {
    public static Specification<ChildGroup> filterByCriteria(Object... values) {
        return FilterProcessor.createSpec((key, value, root, builder) -> builder.equal(root.get(key), value), values);
    }
}