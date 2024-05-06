package com.example.backend.service.entityProcessing.entityFilter;

import com.example.backend.controller.exception.customException.FilterException;
import com.example.backend.entity.dish.menu.Dish;
import com.example.backend.entity.dish.menu.MenuDish;
import com.example.backend.entity.dish.menu.repository.CurrentMenuRepository;
import com.example.backend.entity.dish.menu.repository.DishRepository;
import com.example.backend.entity.dish.menu.repository.MenuDishRepository;
import com.example.backend.entity.dish.order.Order;
import com.example.backend.entity.dish.order.OrderMenu;
import com.example.backend.entity.dish.order.repository.OrderMenuRepository;
import com.example.backend.entity.dish.order.repository.OrderRepository;
import com.example.backend.entity.user.Child;
import com.example.backend.entity.user.ChildGroup;
import com.example.backend.entity.user.repository.ChildRepository;
import com.example.backend.entity.user.repository.GroupRepository;
import com.example.backend.entity.user.repository.UserRepository;
import com.example.backend.payload.dto.ChildDishDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
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
    private final OrderRepository orderRepository;
    private final OrderMenuRepository orderMenuRepository;

    public List<?> getParents(Object... values) {
        return userRepository.findAll(ParentSpecification.filterByCriteria(values));
    }

    public List<?> getChildren(Object... values) {
        return childRepository.findAll(ChildSpecification.filterByCriteria(values));
    }

    public List<?> getGroups(Object... values) {
        return groupRepository.findAll(GroupSpecification.filterByCriteria(values));
    }

    public List<?> getDishes(Object... values) {
        List<Dish> dishes = dishRepository.findAll(DishSpecification.filterByCriteria(values));
        dishes.forEach(o -> o.setImageUrl("http://localhost:8080" + o.getImageUrl().substring(2).replace("\\", "/")));
        return dishes;
    }

    public List<?> getMenu(Object... values) {
        return currentMenuRepository.findAll(MenuSpecification.filterByCriteria(values));
    }

    public List<?> getMenuDish(Object... values) {
        List<MenuDish> dishes = menuDishRepository.findAll(MenuDishSpecification.filterByCriteria(values));
        dishes.forEach(o -> o.getDish().setImageUrl("http://localhost:8080" + o.getDish().getImageUrl().substring(2).replace("\\", "/")));
        return dishes;
    }

    public List<?> getOrder(Object... values) {
        return orderRepository.findAll(OrderSpecification.filterByCriteria(values));
    }

    public List<?> getOrderMenu(Object... values) {
        List<MenuDish> orders = orderMenuRepository.findAll(OrderMenuSpecification.filterByCriteria(values)).stream().map(OrderMenu::getMenuDish).toList();
        orders.forEach(o -> o.getDish().setImageUrl("http://localhost:8080" + o.getDish().getImageUrl().substring(2).replace("\\", "/")));
        return orders;
    }

    public Map<?, ?> getOrdersToWorker(LocalDate currDate) {
        if (currDate == null) {
            throw new FilterException("Поле дата не может быть пустым");
        }
        Map<String, List<ChildDishDTO>> dishDTOMap = new HashMap<>();
        List<ChildGroup> groups = groupRepository.findAll();

        for (ChildGroup group : groups) {

            List<ChildDishDTO> childDishDTOS = new ArrayList<>();

            List<Child> children = childRepository.findAll(ChildSpecification.filterByCriteria("childGroup", group.getId()));
            for (Child child : children) {
                List<Order> orders = orderRepository.findAll(OrderSpecification.filterByCriteria("date", currDate, "child", child.getId()));
                if (orders.isEmpty()) continue;

                Order order = orders.getFirst();

                List<Dish> dishes = orderMenuRepository.findAll(OrderMenuSpecification
                        .filterByCriteria("order", order.getId())).stream().map(o -> o.getMenuDish().getDish()).toList();

                childDishDTOS.add(ChildDishDTO.builder().child(child).dishes(dishes).build());
            }
            dishDTOMap.put(group.getId(), childDishDTOS);
        }

        return dishDTOMap;
    }
}
