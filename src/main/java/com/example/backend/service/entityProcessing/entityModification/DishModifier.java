package com.example.backend.service.entityProcessing.entityModification;

import com.example.backend.controller.exception.customException.ModificationException;
import com.example.backend.entity.dish.menu.Dish;
import com.example.backend.entity.dish.menu.repository.DishRepository;
import com.example.backend.payload.dto.DishDTO;
import com.example.backend.payload.response.ModificationResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import com.example.backend.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class DishModifier {
    private final DishRepository dishRepository;

    private final ImageService imageService;
    public ModificationResponse modify(Long id, DishDTO newData) {
        try {
            Dish dish = dishRepository.findById(id).orElseThrow(() -> new ModificationException("Блюдо не найдено"));

            if (newData.getName() != null) {
                dish.setName(newData.getName());
            }

            if (newData.getComposition() != null) {
                dish.setComposition(newData.getComposition());
            }

            if (newData.getImage() != null) {
                changeImage(dish, newData);
            }

            if (newData.getCategory() != null){
                dish.setCategory(newData.getCategory());
            }

            if (newData.getPrice() != null) {
                dish.setPrice(newData.getPrice());
            }

            dishRepository.save(dish);

            dish.setImageUrl(imageService.refactorPath(dish.getImageUrl()));

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
}
