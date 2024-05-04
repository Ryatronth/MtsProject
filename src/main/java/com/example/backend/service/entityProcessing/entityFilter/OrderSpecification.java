package com.example.backend.service.entityProcessing.entityFilter;

import com.example.backend.entity.dish.order.Order;
import com.example.backend.entity.user.Child;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

public class OrderSpecification {
    public static Specification<Order> filterByCriteria(Object... values) {
        return FilterProcessor.createSpec((key, value, root, builder) ->
                switch (key) {
                    case "child" -> {
                        Join<Order, Child> orderChildJoin = root.join(key);
                        yield builder.equal(orderChildJoin.get("id"), value);
                    }
                    default -> builder.equal(root.get(key), value);
                }, values);
    }
}
