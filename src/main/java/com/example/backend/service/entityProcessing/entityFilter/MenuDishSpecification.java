package com.example.backend.service.entityProcessing.entityFilter;

import com.example.backend.entity.dish.menu.CurrentMenu;
import com.example.backend.entity.dish.menu.MenuDish;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

public class MenuDishSpecification {
    public static Specification<MenuDish> filterByCriteria(Object... values) {
        return FilterProcessor.createSpec((key, value, root, builder) ->
                switch (key) {
                    case "currentMenu" -> {
                        Join<MenuDish, CurrentMenu> menuJoin = root.join(key);
                        yield builder.equal(menuJoin.get("id"), value);
                    }
                    default -> builder.equal(root.get(key), value);
                }, values);
    }
}
