package com.example.backend.service.entityProcessing.entityFilter;

import com.example.backend.entity.auth.RoleName;
import com.example.backend.entity.dish.menu.Dish;
import com.example.backend.entity.dish.menu.MenuDish;
import com.example.backend.entity.dish.menu.repository.CurrentMenuRepository;
import com.example.backend.entity.dish.menu.repository.DishRepository;
import com.example.backend.entity.dish.menu.repository.MenuDishRepository;
import com.example.backend.entity.user.repository.ChildRepository;
import com.example.backend.entity.user.repository.GroupRepository;
import com.example.backend.entity.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EntityFilterService {
    private final UserRepository userRepository;
    private final ChildRepository childRepository;
    private final GroupRepository groupRepository;
    private final DishRepository dishRepository;
    private final CurrentMenuRepository currentMenuRepository;
    private final MenuDishRepository menuDishRepository;

    private Map<String, Object> createFilters(Object... values) {
        Map<String, Object> filters = new HashMap<>();
        for (int i = 0; i < values.length - 1; i += 2) {
            if (values[i + 1] != null) {
                filters.put(values[i].toString(), values[i + 1]);
            }
        }
        return filters;
    }

    public List<?> getParents(Object... values) {
        Map<String, Object> filters = createFilters(values);
        filters.put("role", RoleName.PARENT);
        return userRepository.findAll(ParentSpecification.filterByCriteria(filters));
    }

    public List<?> getChildren(Object... values) {
        Map<String, Object> filters = createFilters(values);
        return childRepository.findAll(ChildSpecification.filterByCriteria(filters));
    }

    public List<?> getGroups(Object... values) {
        Map<String, Object> filters = createFilters(values);
        return groupRepository.findAll(GroupSpecification.filterByCriteria(filters));
    }

    public List<?> getDishes(Object... values) {
        Map<String, Object> filters = createFilters(values);
        List<Dish> dishes = dishRepository.findAll(DishSpecification.filterByCriteria(filters));
        dishes.forEach(o -> o.setImageUrl("http://localhost:8080" + o.getImageUrl().substring(2).replace("\\", "/")));
        return dishes;
    }

    public List<?> getMenu(Object... values) {
        Map<String, Object> filters = createFilters(values);
        return currentMenuRepository.findAll(MenuSpecification.filterByCriteria(filters));
    }

    public List<?> getMenuDish(Object... values) {
        Map<String, Object> filters = createFilters(values);
        List<MenuDish> dishes = menuDishRepository.findAll(MenuDishSpecification.filterByCriteria(filters));
        dishes.forEach(o -> o.getDish().setImageUrl("http://localhost:8080" + o.getDish().getImageUrl().substring(2).replace("\\", "/")));
        return dishes;
    }
}
