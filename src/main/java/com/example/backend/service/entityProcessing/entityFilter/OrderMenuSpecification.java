package com.example.backend.service.entityProcessing.entityFilter;

import com.example.backend.entity.dish.order.Order;
import com.example.backend.entity.dish.order.OrderMenu;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

public class OrderMenuSpecification {
    public static Specification<OrderMenu> filterByCriteria(Object... values) {
        return FilterProcessor.createSpec((key, value, root, builder) ->
                switch (key) {
                    case "order" -> {
                        Join<OrderMenu, Order> orderChildJoin = root.join(key);
                        yield builder.equal(orderChildJoin.get("id"), value);
                    }
                    default -> builder.equal(root.get(key), value);
                }, values);
    }
}
