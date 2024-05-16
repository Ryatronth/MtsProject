package com.example.backend.dining.service.entityProcessing;

import com.example.backend.dining.controller.exception.customException.ModificationException;
import com.example.backend.dining.entity.dish.menu.CurrentMenu;
import com.example.backend.dining.entity.dish.menu.Dish;
import com.example.backend.dining.entity.dish.menu.repository.DishRepository;
import com.example.backend.dining.payload.dto.DishDTO;
import com.example.backend.dining.payload.dto.UpdateMenuDTO;
import com.example.backend.dining.payload.response.CreationResponse;
import com.example.backend.dining.payload.response.DeleteResponse;
import com.example.backend.dining.payload.response.ModificationResponse;
import com.example.backend.dining.service.ImageService;
import com.example.backend.dining.service.util.*;
import com.example.backend.totalPayload.enums.ResponseStatus;
import jakarta.persistence.EntityNotFoundException;
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
                condition -> dishRepository.findByName(data.getName()).isPresent(),
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

    @Override
    public ModificationResponse modify(Long id, DishDTO data) {
        try {
            Dish dish = dishRepository.findById(id).orElseThrow(() -> new ModificationException("Блюдо не найдено"));

            if (data.getImage() != null) {
                changeImage(dish, data);
            }

            if (data.getName() != null) {
                dish.setName(data.getName());
            }

            if (data.getComposition() != null) {
                dish.setComposition(data.getComposition());
            }

            if (data.getCategory() != null) {
                dish.setCategory(data.getCategory());
            }

            if (data.getPrice() != null) {
                dish.setPrice(data.getPrice());
            }

            dishRepository.save(dish);

            return ModificationResponse.builder()
                    .status(ResponseStatus.SUCCESS)
                    .message("Блюдо изменено успешно")
                    .object(dish)
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

        LocalDate currDate = LocalDate.now();

        List<CurrentMenu> menus = menuService.filtrate("fromDate", currDate);
        if (!menus.isEmpty()) {
            for (CurrentMenu menu : menus) {
                long menuId = menu.getId();
                menu.getDishes().stream().filter(o -> o.getDish().equals(dish)).findFirst()
                        .ifPresent(o -> menuService.modify(menuId, UpdateMenuDTO.builder()
                                .toDelete(Set.of(o.getDish().getId()))
                                .toAdd(new HashSet<>())
                                .build()));
            }
        }

        return DeleteResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Блюдо удалено")
                .build();
    }
}
