package com.example.backend.controller;

import com.example.backend.payload.dto.DishDTO;
import com.example.backend.payload.dto.MenuDTO;
import com.example.backend.payload.response.CreationResponse;
import com.example.backend.payload.response.ModificationResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import com.example.backend.service.entityProcessing.DeleteEntityService;
import com.example.backend.service.entityProcessing.entityCreation.EntityCreationService;
import com.example.backend.service.entityProcessing.entityGetting.GetEntityService;
import com.example.backend.service.entityProcessing.entityModification.EntityModificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/worker")
@RequiredArgsConstructor
public class WorkerController {
    private final EntityCreationService entityCreationService;
    private final EntityModificationService entityModificationService;
    private final DeleteEntityService deleteEntityService;
    private final GetEntityService getEntityService;

    @GetMapping("/get/dishes")
    public ResponseEntity<?> getDishes(@RequestParam(value = "name", required = false) String name,
                                       @RequestParam(value = "category", required = false) String category) {
        return ResponseEntity.ok(getEntityService.getDishes("name", name, "category", category));
    }

    @GetMapping("/get/menu")
    public ResponseEntity<?> getMenu(@RequestParam(value = "startDate", required = false) String from,
                                     @RequestParam(value = "endDate", required = false) String to) {
        return ResponseEntity.ok(getEntityService.getMenu("startDate", from, "endDate", to));
    }

    @GetMapping("/get/menu/dishes")
    public ResponseEntity<?> getMenuDishes(@RequestParam(value = "currentMenu", required = false) String id) {
        return ResponseEntity.ok(getEntityService.getMenuDishes("currentMenu", id));
    }

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

    @PostMapping("/update/dish/{dishId}")
    public ResponseEntity<?> updateDish(@PathVariable Long dishId, @ModelAttribute DishDTO data) {
        ModificationResponse response = entityModificationService.updateDish(dishId, data);
        if (response.getStatus() == ResponseStatus.SUCCESS) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(400).body(response);
    }

    @DeleteMapping("/delete/dish/{dishId}")
    public ResponseEntity<?> deleteDish(@PathVariable Long dishId) {
        return ResponseEntity.ok(deleteEntityService.deleteDish(dishId));
    }
}
