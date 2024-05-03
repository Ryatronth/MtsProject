package com.example.backend.controller;

import com.example.backend.payload.dto.DishDTO;
import com.example.backend.payload.dto.MenuDTO;
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

import java.time.LocalDate;
import java.util.HashSet;

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
    public ResponseEntity<?> getDishes(@RequestParam(name = "id", required = false) Long id,
                                       @RequestParam(name = "name", required = false) String name,
                                       @RequestParam(name = "priceFrom", required = false) Double priceFrom,
                                       @RequestParam(name = "priceTo", required = false) Double priceTo,
                                       @RequestParam(name = "exclude", required = false) HashSet<Long> indexes) {
        return ResponseEntity.ok(entityFilterService
                .getDishes("id", id, "name", name, "priceFrom", priceFrom, "priceTo", priceTo, "exclude", indexes));
    }

    @GetMapping("/get/menu")
    public ResponseEntity<?> getMenu(@RequestParam(name = "id", required = false) Long id,
                                     @RequestParam(name = "endDate", required = false) LocalDate endDate,
                                     @RequestParam(name = "startDate", required = false) LocalDate startDate) {
        return ResponseEntity.ok(entityFilterService
                .getMenu("id", id, "endDate", endDate, "startDate", startDate));
    }

    @GetMapping("/get/menu/dishes")
    public ResponseEntity<?> getMenuDishes(@RequestParam(name = "id", required = false) Long id,
                                           @RequestParam(name = "menuId", required = false) Long menuId) {
        return ResponseEntity.ok(entityFilterService
                .getMenuDish("id", id, "currentMenu", menuId));
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
