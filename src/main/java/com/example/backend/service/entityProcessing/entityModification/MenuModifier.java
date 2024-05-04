package com.example.backend.service.entityProcessing.entityModification;

import com.example.backend.controller.exception.customException.ModificationException;
import com.example.backend.entity.dish.menu.CurrentMenu;
import com.example.backend.entity.dish.menu.Dish;
import com.example.backend.entity.dish.menu.MenuDish;
import com.example.backend.entity.dish.menu.repository.CurrentMenuRepository;
import com.example.backend.entity.dish.menu.repository.DishRepository;
import com.example.backend.entity.dish.menu.repository.MenuDishRepository;
import com.example.backend.payload.dto.UpdateMenuDTO;
import com.example.backend.payload.response.ModificationResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class MenuModifier {
    private final CurrentMenuRepository currentMenuRepository;
    private final MenuDishRepository menuDishRepository;
    private final DishRepository dishRepository;

    public ModificationResponse modify(Long id, UpdateMenuDTO newData) {
        try {
            CurrentMenu currentMenu = currentMenuRepository.findById(id).orElseThrow(() -> new ModificationException("Меню не найдено"));

            if (!newData.getToDelete().isEmpty()) {
                deleteDishes(currentMenu , newData.getToDelete());
            }

            if (!newData.getToAdd().isEmpty()) {
                addDishes(currentMenu, newData.getToAdd());
            }

            currentMenuRepository.save(currentMenu);

            return ModificationResponse.builder()
                    .status(ResponseStatus.SUCCESS)
                    .message("Меню изменено успешно")
                    .object(currentMenu)
                    .build();
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
            menuDishRepository.save(MenuDish.builder()
                    .currentMenu(menu)
                    .dish(dish)
                    .build());
        }
    }

    private void deleteDishes(CurrentMenu menu , Set<Long> toDelete) {
        for (long dishId : toDelete) {
            Dish dish = dishRepository.findById(dishId).orElseThrow(() -> new ModificationException("Блюдо не найдено"));
            MenuDish menuDish = menuDishRepository.findByCurrentMenuAndDish(menu, dish).orElseThrow(() -> new ModificationException("Связь меню-блюдо не найдена"));
            menu.getDishes().remove(menuDish);
            menuDishRepository.delete(menuDish);
        }
    }
}
