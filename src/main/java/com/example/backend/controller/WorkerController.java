package com.example.backend.controller;

import com.example.backend.payload.dto.DishDTO;
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
                                       @RequestParam(value = "type", required = false) String type) {
        return ResponseEntity.ok(getEntityService.getDishes("name", name, "type", type));
    }

    @PostMapping("/create/dish")
    public ResponseEntity<?> createDish(@ModelAttribute DishDTO data) {
        CreationResponse response = entityCreationService.createDish(data);
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
