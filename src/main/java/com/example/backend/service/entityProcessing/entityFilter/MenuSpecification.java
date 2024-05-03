package com.example.backend.service.entityProcessing.entityFilter;

import com.example.backend.entity.dish.menu.CurrentMenu;
import org.springframework.data.jpa.domain.Specification;

public class MenuSpecification {
    public static Specification<CurrentMenu> filterByCriteria(Object... values) {
        return FilterProcessor.createSpec((key, value, root, builder) -> builder.equal(root.get(key), value), values);
    }
}
