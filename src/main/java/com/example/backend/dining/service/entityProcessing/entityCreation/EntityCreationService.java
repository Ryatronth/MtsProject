package com.example.backend.dining.service.entityProcessing.entityCreation;

import com.example.backend.dining.controller.exception.customException.CreationException;
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
import com.example.backend.dining.entity.user.ChildGroup;
import com.example.backend.dining.entity.user.Parent;
import com.example.backend.dining.entity.user.User;
import com.example.backend.dining.entity.user.repository.ChildRepository;
import com.example.backend.dining.entity.user.repository.GroupRepository;
import com.example.backend.dining.entity.user.repository.ParentRepository;
import com.example.backend.dining.entity.user.repository.UserRepository;
import com.example.backend.dining.payload.dto.*;
import com.example.backend.dining.payload.response.CreationResponse;
import com.example.backend.dining.service.ImageService;
import com.example.backend.dining.service.entityProcessing.entityFilter.EntityFilterService;
import com.example.backend.totalPayload.enums.ResponseStatus;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class EntityCreationService {
    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;
    private final ParentRepository parentRepository;
    private final ChildRepository childRepository;
    private final GroupRepository groupRepository;
    private final DishRepository dishRepository;
    private final CurrentMenuRepository currentMenuRepository;
    private final MenuDishRepository menuDishRepository;
    private final OrderRepository orderRepository;
    private final OrderMenuRepository orderMenuRepository;

    private final ImageService imageService;
    private final EntityFilterService entityFilterService;

    public CreationResponse createUser(UserDTO data) {
        return EntityBuilder.createEntity(data, userRepository,
                dto -> User.builder()
                        .username(data.getUsername())
                        .password(passwordEncoder.encode(data.getPassword()))
                        .role(data.getRole())
                        .name(data.getName())
                        .surname(data.getSurname())
                        .patronymic(data.getPatronymic())
                        .imageUrl(data.getImageUrl())
                        .phone(data.getPhone())
                        .build(),
                condition -> userRepository.findByUsername(data.getUsername()).isPresent(),
                "Пользователь успешно создан",
                "Пользователь с данным username уже существует");
    }

    public CreationResponse createGroup(GroupDTO data) {
        return EntityBuilder.createEntity(data, groupRepository,
                dto -> ChildGroup.builder()
                        .id(data.getGroupId())
                        .build(),
                condition -> groupRepository.findById(data.getGroupId()).isPresent(),
                "Группа успешно создана",
                "Данная группа уже существует");
    }

    public CreationResponse createChild(ChildDTO data) {
        return EntityBuilder.createEntity(data, childRepository,
                dto -> Child.builder()
                        .name(data.getName())
                        .surname(data.getSurname())
                        .patronymic(data.getPatronymic())
                        .childGroup(groupRepository.findById(data.getGroupId()).get())
                        .imageUrl(data.getImageUrl())
                        .build(),
                condition -> data.getGroupId() == null || groupRepository.findById(data.getGroupId()).isEmpty(),
                "Ребенок успешно создан",
                "Данная группа не найдена");
    }

    @Transactional
    public CreationResponse createParent(ParentDTO data) {
        Set<Child> children = getChildren(data);
        CreationResponse userResponse = createUser(ParentDTO.createUserDTO(data));

        User user = (User) userResponse.getObject();

        CreationResponse parentResponse = EntityBuilder.createEntity(data, parentRepository,
                dto -> Parent.builder()
                        .user(user)
                        .children(children)
                        .build(),
                condition -> false,
                "Родитель успешно создан",
                "Ошибка при создании родителя");

        Parent parent = (Parent) parentResponse.getObject();

        children.forEach(child -> child.setParent(parent));

        return parentResponse;
    }

    private Set<Child> getChildren(ParentDTO data) {
        if (data.getChildren() == null || data.getChildren().isEmpty()) {
            return new HashSet<>();
        }

        Set<Child> children = new HashSet<>();
        for (Long id : data.getChildren()) {
            children.add(childRepository.findById(id).orElseThrow(() -> new CreationException("Ребенок не найден")));
        }
        return children;
    }

    public CreationResponse createDish(DishDTO data) {
        String pathToImage = imageService.saveImage(data.getImage());

        CreationResponse response = EntityBuilder.createEntity(data, dishRepository,
                dto -> Dish.builder()
                        .name(data.getName())
                        .composition(data.getComposition())
                        .category(data.getCategory())
                        .price(data.getPrice())
                        .imageUrl(pathToImage)
                        .isRemoved(false)
                        .build(),
                condition -> dishRepository.findByName(data.getName()).isPresent(),
                "Блюдо успешно создано",
                "Данное блюдо уже существует");

        Dish dish = (Dish) response.getObject();
        dish.setImageUrl(imageService.refactorPath(dish.getImageUrl()));
        response.setObject(dish);
        return response;
    }

    @Transactional
    public CreationResponse createMenu(MenuDTO data) {
        List<CurrentMenu> fromStart = entityFilterService.getMenu("date", data.getStartDate());
        List<CurrentMenu> toEnd = entityFilterService.getMenu("date", data.getEndDate());
        if (!fromStart.isEmpty() || !toEnd.isEmpty()) {
            throw new CreationException("Меню на данные даты уже создано");
        }

        CurrentMenu currentMenu = CurrentMenu.builder()
                .startDate(data.getStartDate())
                .endDate(data.getEndDate())
                .build();

        List<MenuDish> menuDishes = processDishes(currentMenu, data.getDishes());

        currentMenuRepository.save(currentMenu);
        menuDishRepository.saveAll(menuDishes);
        return CreationResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Меню создано успешно")
                .object(currentMenu)
                .build();
    }

    private List<MenuDish> processDishes(CurrentMenu currentMenu, Set<Long> dishes) {
        List<MenuDish> menuDishes = new ArrayList<>();
        for (Long dishId : dishes) {
            Dish dish = dishRepository.findById(dishId).orElseThrow(() -> new CreationException("Блюдо не найдено"));

            MenuDish menuDish = MenuDish.builder()
                    .dish(dish)
                    .currentMenu(currentMenu)
                    .build();
            menuDishes.add(menuDish);
        }
        return menuDishes;
    }

    @Transactional
    public List<CreationResponse> createOrders(Set<OrderDTO> data) {
        List<CreationResponse> responses = new ArrayList<>();
        for (OrderDTO orderDTO : data) {
            responses.add(createOrder(orderDTO));
        }
        return responses;
    }

    private CreationResponse createOrder(OrderDTO data) {
        if (orderRepository.existsByDateAndChildId(data.getDate(), data.getChildId())) {
            throw new CreationException("Для данного ребенка уже составлено меню на " + data.getDate());
        }

        Child child = childRepository.findById(data.getChildId()).orElseThrow(() -> new CreationException("Ребенок не найден"));

        Set<OrderMenu> orderMenus = new HashSet<>();

        Order order = Order.builder()
                .date(data.getDate())
                .child(child)
                .build();

        double totalPrice = processMenuDishes(data, order, orderMenus);
        order.setTotalPrice(totalPrice);
        order.setDetails(orderMenus);

        orderMenuRepository.saveAll(orderMenus);
        orderRepository.save(order);

        return CreationResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Меню для ребенка успешно создано")
                .object(order)
                .build();
    }

    private double processMenuDishes(OrderDTO data, Order order, Set<OrderMenu> orderMenus) {
        double totalPrice = 0;

        for (long menuDishId : data.getMenuDishes()) {
            MenuDish menuDish = menuDishRepository.findById(menuDishId).orElseThrow(() -> new CreationException("Блюдо не найдено"));

            OrderMenu orderMenu = OrderMenu.builder()
                    .order(order)
                    .menuDish(menuDish)
                    .build();

            totalPrice += menuDish.getDish().getPrice();

            orderMenus.add(orderMenu);
        }

        return totalPrice;
    }
}
