package com.example.backend.dining.service.entityProcessing;

import com.example.backend.dining.controller.exception.customException.CreationException;
import com.example.backend.dining.controller.exception.customException.ModificationException;
import com.example.backend.dining.entity.dish.menu.CurrentMenu;
import com.example.backend.dining.entity.dish.menu.Dish;
import com.example.backend.dining.entity.dish.menu.MenuDish;
import com.example.backend.dining.entity.dish.menu.repository.CurrentMenuRepository;
import com.example.backend.dining.entity.dish.menu.repository.DishRepository;
import com.example.backend.dining.entity.dish.menu.repository.MenuDishRepository;
import com.example.backend.dining.entity.dish.order.Order;
import com.example.backend.dining.entity.dish.order.OrderMenu;
import com.example.backend.dining.entity.dish.order.repository.OrderMenuRepository;
import com.example.backend.dining.entity.dish.order.repository.OrderRepository;
import com.example.backend.dining.entity.user.Child;
import com.example.backend.dining.entity.user.repository.ChildRepository;
import com.example.backend.dining.payload.dto.OrderDTO;
import com.example.backend.dining.payload.dto.UpdateOrderDTO;
import com.example.backend.dining.payload.response.CreationResponse;
import com.example.backend.dining.payload.response.DeleteResponse;
import com.example.backend.dining.payload.response.ModificationResponse;
import com.example.backend.dining.payload.response.OrderWorkerResponse;
import com.example.backend.dining.service.RabbitMessageService;
import com.example.backend.dining.service.util.*;
import com.example.backend.totalPayload.enums.ResponseStatus;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Join;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class OrderService implements EntityCreator<Order, OrderDTO>, EntityFilter<Order>, EntityModifier<Long, UpdateOrderDTO>, EntityEraser<Long> {
    private final OrderRepository orderRepository;
    private final ChildRepository childRepository;
    private final MenuDishRepository menuDishRepository;
    private final OrderMenuRepository orderMenuRepository;
    private final CurrentMenuRepository currentMenuRepository;
    private final DishRepository dishRepository;

    private final RabbitMessageService rabbitMessageService;

    @Transactional
    public CreationResponse<List<CreationResponse<Order>>> createAll(Set<OrderDTO> data) {
        List<CreationResponse<Order>> responses = data.stream().map(this::create).toList();
        return CreationResponse
                .<List<CreationResponse<Order>>>builder()
                .status(ResponseStatus.SUCCESS)
                .message("Заказы успешно созданы")
                .object(responses)
                .build();
    }

    @Override
    public CreationResponse<Order> create(OrderDTO data) {
        if (data.getDate().isBefore(LocalDate.now()) || data.getDate().isEqual(LocalDate.now())) throw new CreationException("Невозможно составить заказ на данную дату");
        CurrentMenu menu = currentMenuRepository.findMenuByDate(data.getDate()).orElseThrow(() -> new CreationException("Невозможно составить заказ на данную дату"));
        Child child = childRepository.findById(data.getChildId()).orElseThrow(() -> new CreationException("Ребенок не найден"));

        Set<OrderMenu> orderMenus = new HashSet<>();
        double totalPrice = processMenuDishes(data, menu, orderMenus);

        CreationResponse<Order> response = EntityBuilder.createEntity(data, orderRepository,
                dto -> Order.builder()
                        .date(dto.getDate())
                        .totalPrice(totalPrice)
                        .details(orderMenus)
                        .child(child)
                        .build(),
                condition -> orderRepository.existsByDateAndChildId(data.getDate(), data.getChildId()),
                "Заказ успешно создан",
                "Для данного ребенка уже составлено меню на " + data.getDate());

        orderMenus.forEach(o -> o.setOrder(response.getObject()));

        orderMenuRepository.saveAll(orderMenus);
        return response;
    }

    private double processMenuDishes(OrderDTO data, CurrentMenu menu, Set<OrderMenu> orderMenus) {
        double totalPrice = 0;

        for (long dishId : data.getDishes()) {
            Dish dish = dishRepository.findById(dishId).orElseThrow(() -> new CreationException("Блюдо не найдено"));
            MenuDish menuDish = menuDishRepository.findByCurrentMenuAndDish(menu, dish).orElseThrow(() -> new CreationException("Блюдо не найдено"));

            OrderMenu orderMenu = OrderMenu.builder()
                    .menuDish(menuDish)
                    .build();

            totalPrice += menuDish.getDish().getPrice();

            orderMenus.add(orderMenu);
        }

        return totalPrice;
    }

    @Override
    public List<Order> filtrate(Object... values) {
        return orderRepository.findAll(
                FilterProcessor.createSpec((key, value, root, builder) ->
                        switch (key) {
                            case "child" -> {
                                Join<Order, Child> orderChildJoin = root.join(key);
                                yield builder.equal(orderChildJoin.get("id"), value);
                            }
                            case "toDate" -> builder.lessThanOrEqualTo(root.get("date"), (LocalDate) value);
                            default -> builder.equal(root.get(key), value);
                        }, values)
        );
    }

    @Transactional
    @Override
    public ModificationResponse update(Long id, UpdateOrderDTO data) {
        try {
            Order order = orderRepository.findById(id).orElseThrow(() -> new ModificationException("Заказ не найден"));
            if (data.isPaid()) {
                order.setPaid(true);
                orderRepository.save(order);
                return ModificationResponse.builder()
                        .status(ResponseStatus.SUCCESS)
                        .message("Заказ успешно изменен")
                        .object(order)
                        .build();
            }

            if (order.getDate().isBefore(LocalDate.now()) || order.getDate().isEqual(LocalDate.now())) throw new ModificationException("Невозможно изменить заказ на данную дату");
            CurrentMenu menu = currentMenuRepository.findById(data.getMenuId()).orElseThrow(() -> new ModificationException("Меню не найдено"));

            if (!data.getToDelete().isEmpty()) {
                deleteDishes(order, menu, data.getToDelete());
            }

            if (!data.getToAdd().isEmpty()) {
                addDishes(order, menu, data.getToAdd());
            }

            order.setPaid(data.isPaid());

            orderRepository.save(order);

            return ModificationResponse.builder()
                    .status(ResponseStatus.SUCCESS)
                    .message("Заказ успешно изменен")
                    .object(order)
                    .build();
        } catch (Exception ex) {
            throw new ModificationException(ex.getMessage());
        }
    }

    public Set<Dish> getOrderMenu(Long orderId) {
        Order order = orderRepository.findOrderByIdFetch(orderId).orElseThrow(() -> new EntityNotFoundException("Заказ не найден"));
        return order.getDetails().stream().map(o -> o.getMenuDish().getDish()).collect(Collectors.toSet());
    }

    private void addDishes(Order order, CurrentMenu menu, Set<Long> toAdd) {
        double totalPrice = order.getTotalPrice();
        for (long dishId : toAdd) {
            Dish dish = dishRepository.findById(dishId).orElseThrow(() -> new ModificationException("Блюдо не найдено"));
            MenuDish menuDish = menuDishRepository.findByCurrentMenuAndDish(menu, dish).orElseThrow(() -> new ModificationException("Блюдо в меню не найдено"));

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

    private void deleteDishes(Order order, CurrentMenu menu, Set<Long> toDelete) {
        double totalPrice = order.getTotalPrice();
        for (long dishId : toDelete) {
            Dish dish = dishRepository.findById(dishId).orElseThrow(() -> new ModificationException("Блюдо не найдено"));
            MenuDish menuDish = menuDishRepository.findByCurrentMenuAndDish(menu, dish).orElseThrow(() -> new ModificationException("Блюдо в меню не найдено"));
            OrderMenu orderMenu = orderMenuRepository.findByOrderAndMenuDish(order, menuDish).orElseThrow(() -> new ModificationException("Связь заказ-блюдо не найдена"));
            totalPrice -= menuDish.getDish().getPrice();
            order.getDetails().remove(orderMenu);
            orderMenuRepository.delete(orderMenu);
        }
        order.setTotalPrice(totalPrice);
    }

    @Override
    public DeleteResponse delete(Long id) {
        orderRepository.deleteById(id);
        return DeleteResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Заказ удален")
                .build();
    }

    @RabbitListener(queues = "orders.delete")
    public void deleteInvalidOrders(CurrentMenu menu) {
        Set<Order> orders = orderRepository.findOverlappingOrders(LocalDate.now().plusDays(1), menu.getEndDate());
        if (orders.isEmpty()) return;

        rabbitMessageService.sendRefreshOrders(orders.stream().map(o -> o.getChild().getParent().getUser()).toList());

        orderRepository.deleteAll(orders);
    }

    public Map<String, OrderWorkerResponse> getOrdersToWorker(LocalDate date) {
        List<Order> orders = orderRepository.findOrdersByDateFetch(date);

        HashMap<String, OrderWorkerResponse> result = new HashMap<>();

        orders.forEach(order -> {
            Child child = order.getChild();

            String groupId = child.getChildGroup().getId();

            OrderWorkerResponse response = result.getOrDefault(groupId, new OrderWorkerResponse());
            response.add(OrderWorkerResponse.ChildToWorkerDTO.builder()
                    .id(child.getId())
                    .name(child.getName())
                    .surname(child.getSurname())
                    .patronymic(child.getPatronymic())
                    .dishes(order.getDetails().stream().map(o -> o.getMenuDish().getDish()).toList())
                    .build());
            result.put(groupId, response);
        });

        return result;
    }
}
