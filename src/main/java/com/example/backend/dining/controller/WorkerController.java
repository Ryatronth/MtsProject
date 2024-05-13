package com.example.backend.dining.controller;

import com.example.backend.dining.payload.dto.DishDTO;
import com.example.backend.dining.payload.dto.MenuDTO;
import com.example.backend.dining.payload.dto.UpdateMenuDTO;
import com.example.backend.dining.service.entityProcessing.DeleteEntityService;
import com.example.backend.dining.service.entityProcessing.entityCreation.EntityCreationService;
import com.example.backend.dining.service.entityProcessing.entityFilter.EntityFilterService;
import com.example.backend.dining.service.entityProcessing.entityModification.EntityModificationService;
import com.example.backend.dining.validator.groups.ValidForCreate;
import com.example.backend.dining.validator.groups.ValidForUpdate;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
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
                .getDishes("id", id, "name", name, "priceFrom", priceFrom, "priceTo", priceTo, "exclude", indexes,
                        "isRemoved", false));
    }

    @GetMapping("/get/menu")
    public ResponseEntity<?> getMenu(@RequestParam(name = "id", required = false) Long id,
                                     @RequestParam(name = "endDate", required = false) LocalDate endDate,
                                     @RequestParam(name = "startDate", required = false) LocalDate startDate,
                                     @RequestParam(name = "date", required = false) LocalDate date) {
        return ResponseEntity.ok(entityFilterService.getMenu("id", id, "endDate", endDate, "startDate", startDate,
                "date", date));
    }

    @GetMapping("/get/menu/dishes")
    public ResponseEntity<?> getMenuDishes(@RequestParam(name = "id", required = false) Long id,
                                           @RequestParam(name = "menuId", required = false) Long menuId) {
        return ResponseEntity.ok(entityFilterService.getMenuDish("id", id, "currentMenu", menuId));
    }

    @GetMapping("/get/orders")
    public ResponseEntity<?> getOrders(@RequestParam(name = "date") LocalDate date) {
        return ResponseEntity.ok(entityFilterService.getOrdersToWorker(date));
    }

    // Создание --------------------------------------------------------------------------------------------------------
    @PostMapping("/create/dish")
    public ResponseEntity<?> createDish(@ModelAttribute @Validated(ValidForCreate.class) DishDTO data) {
        return ResponseEntity.ok(entityCreationService.createDish(data));
    }

    @PostMapping("/create/menu")
    public ResponseEntity<?> createMenu(@RequestBody @Validated MenuDTO data) {
        return ResponseEntity.ok(entityCreationService.createMenu(data));
    }

    // Изменение -------------------------------------------------------------------------------------------------------
    @PostMapping("/update/dish/{dishId}")
    public ResponseEntity<?> updateDish(@PathVariable Long dishId, @ModelAttribute @Validated(ValidForUpdate.class) DishDTO data) {
        return ResponseEntity.ok(entityModificationService.updateDish(dishId, data));
    }

    @PostMapping("/update/menu/{menuId}")
    public ResponseEntity<?> updateMenu(@PathVariable Long menuId, @RequestBody @Validated UpdateMenuDTO data) {
        return ResponseEntity.ok(entityModificationService.updateMenu(menuId, data));
    }

    // Удаление --------------------------------------------------------------------------------------------------------
    @DeleteMapping("/delete/dish/{dishId}")
    public ResponseEntity<?> deleteDish(@PathVariable Long dishId) {
        return ResponseEntity.ok(deleteEntityService.deleteDish(dishId));
    }

//    @DeleteMapping("/delete/menu/{menuId}")
//    public ResponseEntity<?> deleteMenu(@PathVariable Long menuId) {
//        return ResponseEntity.ok(deleteEntityService.deleteMenu(menuId));
//    }
}
