package com.example.backend.service.entityProcessing.entityModification;

import com.example.backend.controller.exception.customException.ModificationException;
import com.example.backend.entity.dish.menu.CurrentMenu;
import com.example.backend.entity.dish.menu.Dish;
import com.example.backend.entity.dish.menu.MenuDish;
import com.example.backend.entity.dish.menu.repository.CurrentMenuRepository;
import com.example.backend.entity.dish.menu.repository.DishRepository;
import com.example.backend.entity.dish.menu.repository.MenuDishRepository;
import com.example.backend.entity.dish.order.Order;
import com.example.backend.entity.dish.order.repository.OrderRepository;
import com.example.backend.entity.user.Child;
import com.example.backend.entity.user.User;
import com.example.backend.entity.user.repository.ChildRepository;
import com.example.backend.entity.user.repository.UserRepository;
import com.example.backend.payload.dto.UpdateMenuDTO;
import com.example.backend.payload.response.ModificationResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import com.example.backend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class MenuModifier {
    private final CurrentMenuRepository currentMenuRepository;
    private final MenuDishRepository menuDishRepository;
    private final DishRepository dishRepository;
    private final OrderRepository orderRepository;

    private final NotificationService notificationService;
    private final ChildRepository childRepository;
    private final UserRepository userRepository;

    public ModificationResponse modify(Long id, UpdateMenuDTO newData) {
        try {
            CurrentMenu currentMenu = currentMenuRepository.findById(id).orElseThrow(() -> new ModificationException("Меню не найдено"));
            LocalDate currDate = LocalDate.now();

            if (!((currentMenu.getStartDate().isBefore(currDate) || currentMenu.getStartDate().isEqual(currDate))
                    && (currentMenu.getEndDate().isAfter(currDate) || currentMenu.getEndDate().isEqual(currDate))
                    || currentMenu.getStartDate().isAfter(currDate))) {
                throw new ModificationException("Вы не можете изменить меню за прошлые месяцы");
            }

            if (!newData.getToDelete().isEmpty()) {
                deleteDishes(currentMenu, newData.getToDelete());
                refreshOrders(currentMenu);
            }

            if (!newData.getToAdd().isEmpty()) {
                addDishes(currentMenu, newData.getToAdd());
            }

            currentMenuRepository.save(currentMenu);

            return ModificationResponse.builder().status(ResponseStatus.SUCCESS).message("Меню изменено успешно").object(currentMenu).build();
        } catch (Exception ex) {
            throw new ModificationException(ex.getMessage());
        }
    }

    private void addDishes(CurrentMenu menu, Set<Long> toAdd) {
        for (long dishId : toAdd) {
            Dish dish = dishRepository.findById(dishId).orElseThrow(() -> new ModificationException("Блюдо не найдено"));
            if (menuDishRepository.findByCurrentMenuAndDish(menu, dish).isPresent()) {
                throw new ModificationException("Данное блюдо уже добавлено в меню");
            }
            menuDishRepository.save(MenuDish.builder().currentMenu(menu).dish(dish).build());
        }
    }

    private void deleteDishes(CurrentMenu menu, Set<Long> toDelete) {
        for (long dishId : toDelete) {
            Dish dish = dishRepository.findById(dishId).orElseThrow(() -> new ModificationException("Блюдо не найдено"));
            MenuDish menuDish = menuDishRepository.findByCurrentMenuAndDish(menu, dish).orElseThrow(() -> new ModificationException("Связь меню-блюдо не найдена"));
            menuDish.setCurrentMenu(null);
            menu.getDishes().remove(menuDish);
            menuDishRepository.save(menuDish);
        }
    }

    private void refreshOrders(CurrentMenu menu) {
        Set<Order> orders = orderRepository.findOverlappingOrders(LocalDate.now(), menu.getEndDate());

        if (orders.isEmpty()) return;

        createNotifications(orders);

        orderRepository.deleteAll(orders);
    }

    private void createNotifications(Set<Order> orders) {
        for (Order order : orders) {
            Child child = childRepository.findById(order.getChild().getId()).orElseThrow(() -> new ModificationException("Ребенок не найден"));
            User user = userRepository.findById(child.getParent().getId()).orElseThrow(() -> new ModificationException("Родитель не найден"));

            notificationService.createNotification(user, "Меню было изменено " + LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM")) + ". Пожалуйста, составьте меню для своих детей заново.");
        }
    }
}
