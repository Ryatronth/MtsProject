package com.example.backend.service.entityProcessing.entityFilter;

import com.example.backend.entity.dish.menu.CurrentMenu;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class MenuSpecification {
    public static Specification<CurrentMenu> filterByCriteria(Object... values) {
        return FilterProcessor.createSpec((key, value, root, builder) ->
                switch (key) {
                    case "date" -> builder.and(builder.lessThanOrEqualTo(root.get("startDate"), (LocalDate) value),
                            builder.greaterThanOrEqualTo(root.get("endDate"), (LocalDate) value));
                    case "fromDate" -> builder.or(builder.and(builder.lessThanOrEqualTo(root.get("startDate"), (LocalDate) value),
                                builder.greaterThanOrEqualTo(root.get("endDate"), (LocalDate) value)),
                                builder.greaterThanOrEqualTo(root.get("startDate"), (LocalDate) value));
                    default -> builder.equal(root.get(key), value);
                }, values);
    }
}
