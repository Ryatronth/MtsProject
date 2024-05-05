package com.example.backend.service.entityProcessing.entityCreation;

import com.example.backend.controller.exception.customException.CreationException;
import com.example.backend.entity.dish.menu.CurrentMenu;
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
import com.example.backend.entity.user.Parent;
import com.example.backend.entity.user.User;
import com.example.backend.entity.user.repository.ChildRepository;
import com.example.backend.entity.user.repository.GroupRepository;
import com.example.backend.entity.user.repository.ParentRepository;
import com.example.backend.entity.user.repository.UserRepository;
import com.example.backend.payload.dto.*;
import com.example.backend.payload.response.CreationResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

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

    private final EntityBuilder entityBuilder;

    public CreationResponse createUser(UserDTO data) {
        return entityBuilder.createEntity(data, userRepository,
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
        return entityBuilder.createEntity(data, groupRepository,
                dto -> ChildGroup.builder()
                        .id(data.getGroupId())
                        .build(),
                condition -> groupRepository.findById(data.getGroupId()).isPresent(),
                "Группа успешно создана",
                "Данная группа уже существует");
    }

    public CreationResponse createChild(ChildDTO data) {
        return entityBuilder.createEntity(data, childRepository,
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
        CreationResponse userResponse = createUser(ParentDTO.createUserDTO(data));

        User user = (User) userResponse.getObject();

        Set<Child> children = getChildren(data);

        CreationResponse parentResponse = entityBuilder.createEntity(data, parentRepository,
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
        String pathToImage = saveImage(data.getImage());

        CreationResponse response = entityBuilder.createEntity(data, dishRepository,
                dto -> Dish.builder()
                        .name(data.getName())
                        .composition(data.getComposition())
                        .category(data.getCategory())
                        .price(data.getPrice())
                        .imageUrl(pathToImage)
                        .build(),
                condition -> dishRepository.findByName(data.getName()).isPresent(),
                "Блюдо успешно создано",
                "Данное блюдо уже существует");

        Dish dish = (Dish) response.getObject();
        dish.setImageUrl("http://localhost:8080" + dish.getImageUrl().substring(2).replace("\\", "/"));
        response.setObject(dish);
        return response;
    }

    private String saveImage(MultipartFile image) {
        try {
            if (image.isEmpty()) {
                throw new CreationException("Файл пуст");
            }

            byte[] bytes = image.getBytes();

            String UPLOAD_DIR = "../images/dish/";

            String filename = UUID.randomUUID().toString();

            Path path = Paths.get(UPLOAD_DIR + filename);
            Files.write(path, bytes);

            return path.toString();
        } catch (IOException ex) {
            throw new CreationException(ex.getMessage());
        }
    }

    public CreationResponse createMenu(MenuDTO data) {
        Set<CurrentMenu> menus = currentMenuRepository.findOverlappingMenus(data.getStartDate(), data.getEndDate());
        if (!menus.isEmpty()) {
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

    private CreationResponse createOrder(OrderDTO data) {
        if (orderRepository.existsByDateAndChildId(data.getDate(), data.getChildId())) {
            throw new CreationException("Для данного ребенка уже составлено меню на " + data.getDate());
        }

        Child child = childRepository.findById(data.getChildId()).orElseThrow(() -> new CreationException("Ребенок не найден"));

        Set<OrderMenu> orderMenus = new HashSet<>();

        Order order = orderRepository.save(
                Order.builder()
                        .date(data.getDate())
                        .child(child)
                        .build());

        double totalPrice = 0;

        for (long menuDishId : data.getMenuDishes()) {
            MenuDish menuDish = menuDishRepository.findById(menuDishId).orElseThrow(() -> new CreationException("Блюдо не найдено"));

            OrderMenu orderMenu = orderMenuRepository.save(
                    OrderMenu.builder()
                            .order(order)
                            .menuDish(menuDish)
                            .build());

            totalPrice += menuDish.getDish().getPrice();

            orderMenus.add(orderMenu);
        }

        order.setTotalPrice(totalPrice);
        order.setDetails(orderMenus);

        orderRepository.save(order);
        return CreationResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Меню для ребенка успешно создано")
                .object(order)
                .build();
    }

    @Transactional
    public List<CreationResponse> createOrders(Set<OrderDTO> data) {
        List<CreationResponse> responses = new ArrayList<>();
        for (OrderDTO orderDTO : data) {
            responses.add(createOrder(orderDTO));
        }
        return responses;
    }
}
