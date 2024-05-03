package com.example.backend.service.entityProcessing.entityFilter;

import com.example.backend.entity.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

@RequiredArgsConstructor
public class ParentSpecification {
    public static Specification<User> filterByCriteria(Object... values) {
        return FilterProcessor.createSpec((key, value, root, builder) ->
                switch (key) {
                    case "role", "id" -> builder.equal(root.get(key), value);
                    default -> builder.like(builder.lower(root.get(key)), "%" + value.toString().toLowerCase() + "%");
                }, values);
    }
}
