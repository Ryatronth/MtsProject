package com.example.backend.service.entityProcessing.entityModification;

import com.example.backend.controller.exception.customException.ModificationException;
import com.example.backend.entity.dish.menu.Dish;
import com.example.backend.entity.dish.menu.repository.DishRepository;
import com.example.backend.payload.dto.DishDTO;
import com.example.backend.payload.response.ModificationResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
@RequiredArgsConstructor
public class DishModifier {
    private final DishRepository dishRepository;
    public ModificationResponse modify(Long id, DishDTO newData) {
        try {
            Dish dish = dishRepository.findById(id).orElseThrow(() -> new ModificationException("Ребенок не найден"));

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

            dish.setImageUrl("http://localhost:8080" + dish.getImageUrl().substring(2).replace("\\", "/"));

            return ModificationResponse.builder()
                    .status(ResponseStatus.SUCCESS)
                    .message("Ребенок изменен успешно")
                    .object(dish)
                    .build();
        } catch (Exception ex) {
            throw new ModificationException(ex.getMessage());
        }
    }

    private void changeImage(Dish dish, DishDTO newData) throws Exception {
        MultipartFile image = newData.getImage();

        if (image.isEmpty()) {
            return;
        }

        File oldImage = new File(dish.getImageUrl());
        oldImage.delete();

        byte[] bytes = newData.getImage().getBytes();
        String UPLOAD_DIR = "../images/dish/";

        Path path = Paths.get(UPLOAD_DIR + image.getOriginalFilename());
        Files.write(path, bytes);

        dish.setImageUrl(path.toString());
    }
}
