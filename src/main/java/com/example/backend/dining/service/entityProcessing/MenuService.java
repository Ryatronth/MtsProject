package com.example.backend.dining.service.entityProcessing;

import com.example.backend.dining.controller.exception.customException.CreationException;
import com.example.backend.dining.controller.exception.customException.ModificationException;
import com.example.backend.dining.entity.dish.menu.CurrentMenu;
import com.example.backend.dining.entity.dish.menu.Dish;
import com.example.backend.dining.entity.dish.menu.MenuDish;
import com.example.backend.dining.entity.dish.menu.repository.CurrentMenuRepository;
import com.example.backend.dining.entity.dish.menu.repository.DishRepository;
import com.example.backend.dining.entity.dish.menu.repository.MenuDishRepository;
import com.example.backend.dining.payload.dto.MenuDTO;
import com.example.backend.dining.payload.dto.UpdateMenuDTO;
import com.example.backend.dining.payload.response.CreationResponse;
import com.example.backend.dining.payload.response.ModificationResponse;
import com.example.backend.dining.service.RabbitMessageService;
import com.example.backend.dining.service.util.*;
import com.example.backend.totalPayload.enums.ResponseStatus;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class MenuService implements EntityCreator<CurrentMenu, MenuDTO>, EntityFilter<CurrentMenu>, EntityModifier<Long, UpdateMenuDTO> {
    private final CurrentMenuRepository currentMenuRepository;
    private final MenuDishRepository menuDishRepository;
    private final DishRepository dishRepository;

    private final RabbitMessageService rabbitMessageService;

    @Transactional
    @Override
    public CreationResponse<CurrentMenu> create(MenuDTO data) {
        List<CurrentMenu> fromStart = filtrate("date", data.getStartDate());
        List<CurrentMenu> toEnd = filtrate("date", data.getEndDate());
        if (!fromStart.isEmpty() || !toEnd.isEmpty()) {
            throw new CreationException("Меню на данные даты уже создано");
        }

        CreationResponse<CurrentMenu> response = EntityBuilder.createEntity(data, currentMenuRepository,
                dto -> CurrentMenu.builder()
                        .startDate(dto.getStartDate())
                        .endDate(dto.getEndDate())
                        .build(),
                condition -> !filtrate("date", data.getStartDate()).isEmpty() || !filtrate("date", data.getEndDate()).isEmpty(),
                "Меню успешно создано",
                "Меню на данные даты уже существует"
        );


        List<MenuDish> menuDishes = processDishes(response.getObject(), data.getDishes());

        menuDishRepository.saveAll(menuDishes);
        return response;
    }

    private List<MenuDish> processDishes(CurrentMenu currentMenu, Set<Long> dishes) {
        List<MenuDish> menuDishes = new ArrayList<>();
        for (Long dishId : dishes) {
            Dish dish = dishRepository.findById(dishId).orElseThrow(() -> new CreationException("Блюдо не найдено"));
            if (dish.isRemoved()) throw new CreationException("Данное блюдо удалено из меню");

            MenuDish menuDish = MenuDish.builder()
                    .dish(dish)
                    .currentMenu(currentMenu)
                    .build();
            menuDishes.add(menuDish);
        }
        return menuDishes;
    }

    @Override
    public List<CurrentMenu> filtrate(Object... values) {
        return currentMenuRepository.findAll(
                FilterProcessor.createSpec((key, value, root, builder) ->
                        switch (key) {
                            case "date" ->
                                    builder.and(builder.lessThanOrEqualTo(root.get("startDate"), (LocalDate) value),
                                            builder.greaterThanOrEqualTo(root.get("endDate"), (LocalDate) value));
                            case "fromDate" ->
                                    builder.or(builder.and(builder.lessThanOrEqualTo(root.get("startDate"), (LocalDate) value),
                                                    builder.greaterThanOrEqualTo(root.get("endDate"), (LocalDate) value)),
                                            builder.greaterThanOrEqualTo(root.get("startDate"), (LocalDate) value));
                            default -> builder.equal(root.get(key), value);
                        }, values)
        );
    }

    public Set<MenuDish> getMenuDishes(Long menuId) {
        CurrentMenu menu = currentMenuRepository.findById(menuId).orElseThrow(() -> new EntityNotFoundException("Меню не найдено"));
        return menu.getDishes();
    }

    @Transactional
    @Override
    public ModificationResponse update(Long id, UpdateMenuDTO data) {
        try {
            CurrentMenu currentMenu = currentMenuRepository.findById(id).orElseThrow(() -> new ModificationException("Меню не найдено"));
            LocalDate currDate = LocalDate.now();

            if (!((currentMenu.getStartDate().isBefore(currDate) || currentMenu.getStartDate().isEqual(currDate))
                    && (currentMenu.getEndDate().isAfter(currDate) || currentMenu.getEndDate().isEqual(currDate))
                    || currentMenu.getStartDate().isAfter(currDate))) {
                throw new ModificationException("Вы не можете изменить меню за прошлые месяцы");
            }

            if (!data.getToDelete().isEmpty()) {
                deleteDishes(currentMenu, data.getToDelete());
                rabbitMessageService.sendDeleteOrders(currentMenu);
            }

            if (!data.getToAdd().isEmpty()) {
                addDishes(currentMenu, data.getToAdd());
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
}
