package com.example.backend.dining.service.entityProcessing.entityModification;

import com.example.backend.dining.controller.exception.customException.ModificationException;
import com.example.backend.dining.entity.dish.menu.MenuDish;
import com.example.backend.dining.entity.dish.menu.repository.MenuDishRepository;
import com.example.backend.dining.entity.dish.order.Order;
import com.example.backend.dining.entity.dish.order.OrderMenu;
import com.example.backend.dining.entity.dish.order.repository.OrderMenuRepository;
import com.example.backend.dining.entity.dish.order.repository.OrderRepository;
import com.example.backend.dining.payload.dto.UpdateOrderDTO;
import com.example.backend.dining.payload.response.ModificationResponse;
import com.example.backend.totalPayload.enums.ResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class OrderModifier {
    private final OrderRepository orderRepository;
    private final OrderMenuRepository orderMenuRepository;
    private final MenuDishRepository menuDishRepository;

    public ModificationResponse modify(Long id, UpdateOrderDTO newData) {
        try {
            Order order = orderRepository.findById(id).orElseThrow(() -> new ModificationException("Заказ не найден"));

            if (!newData.getToDelete().isEmpty()) {
                deleteDishes(order, newData.getToDelete());
            }

            if (!newData.getToAdd().isEmpty()) {
                addDishes(order, newData.getToAdd());
            }

            orderRepository.save(order);

            return ModificationResponse.builder()
                    .status(ResponseStatus.SUCCESS)
                    .message("Меню изменено успешно")
                    .object(order)
                    .build();
        } catch (Exception ex) {
            throw new ModificationException(ex.getMessage());
        }
    }

    private void addDishes(Order order, Set<Long> toAdd) {
        double totalPrice = order.getTotalPrice();
        for (long dishId : toAdd) {
            MenuDish menuDish = menuDishRepository.findById(dishId).orElseThrow(() -> new ModificationException("Блюдо в меню не найдено"));
            if (orderMenuRepository.findByOrderAndMenuDish(order, menuDish).isPresent()) {
                throw new ModificationException("Данное блюдо уже добавлено в рацион");
            }
            totalPrice += menuDish.getDish().getPrice();
            orderMenuRepository.save(OrderMenu.builder()
                    .order(order)
                    .menuDish(menuDish)
                    .build());
        }
        order.setTotalPrice(totalPrice);
    }

    private void deleteDishes(Order order, Set<Long> toDelete) {
        double totalPrice = order.getTotalPrice();
        for (long dishId : toDelete) {
            MenuDish menuDish = menuDishRepository.findById(dishId).orElseThrow(() -> new ModificationException("Блюдо в меню не найдено"));
            OrderMenu orderMenu = orderMenuRepository.findByOrderAndMenuDish(order, menuDish).orElseThrow(() -> new ModificationException("Связь заказ-блюдо не найдена"));
            totalPrice -= menuDish.getDish().getPrice();
            order.getDetails().remove(orderMenu);
            orderMenuRepository.delete(orderMenu);
        }
        order.setTotalPrice(totalPrice);
    }
}
