package com.example.backend.controller;

import com.example.backend.payload.dto.DishDTO;
import com.example.backend.payload.dto.MenuDTO;
import com.example.backend.payload.dto.SearchDTO;
import com.example.backend.payload.dto.UpdateMenuDTO;
import com.example.backend.payload.response.CreationResponse;
import com.example.backend.payload.response.ModificationResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import com.example.backend.service.entityProcessing.DeleteEntityService;
import com.example.backend.service.entityProcessing.entityCreation.EntityCreationService;
import com.example.backend.service.entityProcessing.entityFilter.EntityFilterService;
import com.example.backend.service.entityProcessing.entityModification.EntityModificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/worker")
@RequiredArgsConstructor
public class WorkerController {
    private final EntityCreationService entityCreationService;
    private final EntityModificationService entityModificationService;
    private final DeleteEntityService deleteEntityService;
    private final EntityFilterService entityFilterService;

    // Получение -------------------------------------------------------------------------------------------------------
    @GetMapping("/get/dishes")
    public ResponseEntity<?> getDishes(@RequestBody List<SearchDTO> filters) {
        return ResponseEntity.ok(entityFilterService.getDishes(filters));
    }

    @GetMapping("/get/menu")
    public ResponseEntity<?> getMenu(@RequestBody List<SearchDTO> filters) {
        return ResponseEntity.ok(entityFilterService.getMenu(filters));
    }

    @GetMapping("/get/menu/dishes")
    public ResponseEntity<?> getMenuDishes(@RequestBody List<SearchDTO> filters) {
        return ResponseEntity.ok(entityFilterService.getMenuDish(filters));
    }

    // Создание --------------------------------------------------------------------------------------------------------
    @PostMapping("/create/dish")
    public ResponseEntity<?> createDish(@ModelAttribute DishDTO data) {
        CreationResponse response = entityCreationService.createDish(data);
        if (response.getStatus() == ResponseStatus.SUCCESS) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(400).body(response);
    }

    @PostMapping("/create/menu")
    public ResponseEntity<?> createDish(@RequestBody MenuDTO data) {
        CreationResponse response = entityCreationService.createMenu(data);
        if (response.getStatus() == ResponseStatus.SUCCESS) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(400).body(response);
    }

    // Изменение -------------------------------------------------------------------------------------------------------
    @PostMapping("/update/dish/{dishId}")
    public ResponseEntity<?> updateDish(@PathVariable Long dishId, @ModelAttribute DishDTO data) {
        ModificationResponse response = entityModificationService.updateDish(dishId, data);
        if (response.getStatus() == ResponseStatus.SUCCESS) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(400).body(response);
    }

    @PostMapping("/update/menu/{menuId}")
    public ResponseEntity<?> updateMenu(@PathVariable Long menuId, @RequestBody UpdateMenuDTO data) {
        ModificationResponse response = entityModificationService.updateMenu(menuId, data);
        if (response.getStatus() == ResponseStatus.SUCCESS) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(400).body(response);
    }

    // Удаление --------------------------------------------------------------------------------------------------------
    @DeleteMapping("/delete/dish/{dishId}")
    public ResponseEntity<?> deleteDish(@PathVariable Long dishId) {
        return ResponseEntity.ok(deleteEntityService.deleteDish(dishId));
    }

    @DeleteMapping("/delete/menu/{menuId}")
    public ResponseEntity<?> deleteMenu(@PathVariable Long menuId) {
        return ResponseEntity.ok(deleteEntityService.deleteMenu(menuId));
    }
}
