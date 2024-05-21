package com.example.backend.dining.service.entityProcessing;

import com.example.backend.dining.controller.exception.customException.ModificationException;
import com.example.backend.dining.entity.dish.menu.CurrentMenu;
import com.example.backend.dining.entity.dish.menu.Dish;
import com.example.backend.dining.entity.dish.menu.MenuDish;
import com.example.backend.dining.entity.dish.menu.repository.DishRepository;
import com.example.backend.dining.entity.dish.menu.repository.MenuDishRepository;
import com.example.backend.dining.payload.dto.DishDTO;
import com.example.backend.dining.payload.dto.UpdateMenuDTO;
import com.example.backend.dining.payload.response.CreationResponse;
import com.example.backend.dining.payload.response.DeleteResponse;
import com.example.backend.dining.payload.response.ModificationResponse;
import com.example.backend.dining.service.ImageService;
import com.example.backend.dining.service.util.*;
import com.example.backend.totalPayload.enums.ResponseStatus;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DishService implements EntityCreator<Dish, DishDTO>, EntityFilter<Dish>, EntityModifier<Long, DishDTO>, EntityEraser<Long> {
    private final DishRepository dishRepository;
    private final MenuDishRepository menuDishRepository;

    private final ImageService imageService;
    private final MenuService menuService;

    @Override
    public CreationResponse<Dish> create(DishDTO data) {
        String pathToImage = imageService.saveImage(data.getImage());

        return EntityBuilder.createEntity(data, dishRepository,
                dto -> Dish.builder()
                        .name(data.getName())
                        .composition(data.getComposition())
                        .category(data.getCategory())
                        .price(data.getPrice())
                        .imageUrl(pathToImage)
                        .isRemoved(false)
                        .build(),
                condition -> dishRepository.findAllByName(data.getName()).stream().anyMatch(o -> !o.isRemoved()),
                "Блюдо успешно создано",
                "Данное блюдо уже существует");
    }

    private CreationResponse<Dish> create(Dish data, String name) {
        return EntityBuilder.createEntity(data, dishRepository,
                dto -> Dish.builder()
                        .name(name)
                        .composition(data.getComposition())
                        .category(data.getCategory())
                        .price(data.getPrice())
                        .imageUrl(data.getImageUrl())
                        .isRemoved(false)
                        .build(),
                condition -> dishRepository.findAllByName(name).stream().anyMatch(o -> !o.isRemoved()),
                "Блюдо успешно создано",
                "Данное блюдо уже существует");
    }

    @Override
    public List<Dish> filtrate(Object... values) {
        return dishRepository.findAll(
                FilterProcessor.createSpec((key, value, root, builder) ->
                        switch (key) {
                            case "id", "isRemoved" -> builder.equal(root.get(key), value);
                            case "priceFrom" -> builder.greaterThanOrEqualTo(root.get("price"), (Double) value);
                            case "priceTo" -> builder.lessThanOrEqualTo(root.get("price"), (Double) value);
                            case "exclude" -> {
                                Set<Long> val = new HashSet<>((Set<Long>) value);
                                yield root.get("id").in(val).not();
                            }
                            default ->
                                    builder.like(builder.lower(root.get(key)), "%" + value.toString().toLowerCase() + "%");
                        }, values)
        );
    }

    @Transactional
    @Override
    public ModificationResponse update(Long id, DishDTO data) {
        try {
            Dish dish = dishRepository.findById(id).orElseThrow(() -> new ModificationException("Блюдо не найдено"));
            dish.setRemoved(true);
            dishRepository.save(dish);

            List<MenuDish> dishes = menuDishRepository.findAllByDish(dish, LocalDate.now());

            Dish newDish = create(dish, data.getName() == null ? dish.getName() : data.getName()).getObject();

            if (data.getImage() != null) {
                changeImage(newDish, data);
            }

            if (data.getComposition() != null) {
                newDish.setComposition(data.getComposition());
            }

            if (data.getCategory() != null) {
                newDish.setCategory(data.getCategory());
            }

            if (data.getPrice() != null) {
                newDish.setPrice(data.getPrice());
            }

            if (!dishes.isEmpty()) {
                dishes.forEach(menuDish -> menuDish.setDish(newDish));
                menuDishRepository.saveAll(dishes);
            }

            changeMenu(newDish);

            return ModificationResponse.builder()
                    .status(ResponseStatus.SUCCESS)
                    .message("Блюдо изменено успешно")
                    .object(newDish)
                    .build();
        } catch (Exception ex) {
            throw new ModificationException(ex.getMessage());
        }
    }

    private void changeImage(Dish dish, DishDTO newData) {
        MultipartFile image = newData.getImage();
        if (image.isEmpty()) {
            return;
        }
        imageService.deleteImage(dish.getImageUrl());
        dish.setImageUrl(imageService.saveImage(image));
    }

    @Override
    public DeleteResponse delete(Long id) {
        Dish dish = dishRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Блюдо не найдено"));
        dish.setRemoved(true);
        dishRepository.save(dish);

        changeMenu(dish);

        return DeleteResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Блюдо удалено")
                .build();
    }

    private void changeMenu(Dish dish) {
        List<CurrentMenu> menus = menuService.filtrate("fromDate", LocalDate.now());
        if (!menus.isEmpty()) {
            for (CurrentMenu menu : menus) {
                long menuId = menu.getId();
                menu.getDishes().stream().filter(o -> o.getDish().equals(dish)).findFirst()
                        .ifPresent(o -> menuService.update(menuId, UpdateMenuDTO.builder()
                                .toDelete(Set.of(o.getDish().getId()))
                                .toAdd(new HashSet<>())
                                .build()));
            }
        }
    }
}
