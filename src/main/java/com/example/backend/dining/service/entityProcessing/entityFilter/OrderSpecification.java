package com.example.backend.dining.service.entityProcessing.entityFilter;

import com.example.backend.dining.entity.dish.order.Order;
import com.example.backend.dining.entity.user.Child;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class OrderSpecification {
    public static Specification<Order> filterByCriteria(Object... values) {
        return FilterProcessor.createSpec((key, value, root, builder) ->
                switch (key) {
                    case "child" -> {
                        Join<Order, Child> orderChildJoin = root.join(key);
                        yield builder.equal(orderChildJoin.get("id"), value);
                    }
                    case "startDate" -> builder.greaterThanOrEqualTo(root.get("date"), (LocalDate) value);
                    case "endDate" -> builder.lessThanOrEqualTo(root.get("date"), (LocalDate) value);
                    default -> builder.equal(root.get(key), value);
                }, values);
    }
}
