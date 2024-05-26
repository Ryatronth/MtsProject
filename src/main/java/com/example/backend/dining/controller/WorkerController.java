package com.example.backend.dining.controller;

import com.example.backend.dining.payload.dto.DishDTO;
import com.example.backend.dining.payload.dto.MenuDTO;
import com.example.backend.dining.payload.dto.UpdateMenuDTO;
import com.example.backend.dining.service.NotificationService;
import com.example.backend.dining.service.entityProcessing.DishService;
import com.example.backend.dining.service.entityProcessing.MenuService;
import com.example.backend.dining.service.entityProcessing.OrderService;
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
    private final DishService dishService;
    private final MenuService menuService;
    private final OrderService orderService;

    private final NotificationService notificationService;

    // Получение -------------------------------------------------------------------------------------------------------
    @GetMapping("/get/dishes")
    public ResponseEntity<?> getDishes(@RequestParam(name = "id", required = false) Long id,
                                       @RequestParam(name = "name", required = false) String name,
                                       @RequestParam(name = "priceFrom", required = false) Double priceFrom,
                                       @RequestParam(name = "priceTo", required = false) Double priceTo,
                                       @RequestParam(name = "exclude", required = false) HashSet<Long> indexes) {
        return ResponseEntity.ok(dishService
                .filtrate("id", id, "name", name, "priceFrom", priceFrom, "priceTo", priceTo, "exclude", indexes,
                        "isRemoved", false));
    }

    @GetMapping("/get/menus")
    public ResponseEntity<?> getMenu(@RequestParam(name = "id", required = false) Long id,
                                     @RequestParam(name = "endDate", required = false) LocalDate endDate,
                                     @RequestParam(name = "startDate", required = false) LocalDate startDate,
                                     @RequestParam(name = "date", required = false) LocalDate date) {
        return ResponseEntity.ok(menuService.filtrate("id", id, "endDate", endDate, "startDate", startDate,
                "date", date));
    }

    @GetMapping("/get/menu/{menuId}/dishes")
    public ResponseEntity<?> getMenuDishes(@PathVariable Long menuId) {
        return ResponseEntity.ok(menuService.getMenuDishes(menuId));
    }

    @GetMapping("/get/orders/date/{date}")
    public ResponseEntity<?> getOrders(@PathVariable LocalDate date) {
        return ResponseEntity.ok(orderService.getOrdersToWorker(date));
    }

    @GetMapping("/get/notifications/{userId}")
    public ResponseEntity<?> getNotifications(@PathVariable Long userId) {
        return ResponseEntity.ok(notificationService.getUserNotification(userId));
    }

    // Создание --------------------------------------------------------------------------------------------------------
    @PostMapping("/create/dish")
    public ResponseEntity<?> createDish(@ModelAttribute @Validated(ValidForCreate.class) DishDTO data) {
        return ResponseEntity.ok(dishService.create(data));
    }

    @PostMapping("/create/menu")
    public ResponseEntity<?> createMenu(@RequestBody @Validated MenuDTO data) {
        return ResponseEntity.ok(menuService.create(data));
    }

    // Изменение -------------------------------------------------------------------------------------------------------
    @PutMapping("/update/dish/{dishId}")
    public ResponseEntity<?> updateDish(@PathVariable Long dishId, @ModelAttribute @Validated(ValidForUpdate.class) DishDTO data) {
        return ResponseEntity.ok(dishService.update(dishId, data));
    }

    @PutMapping("/update/menu/{menuId}")
    public ResponseEntity<?> updateMenu(@PathVariable Long menuId, @RequestBody @Validated UpdateMenuDTO data) {
        return ResponseEntity.ok(menuService.update(menuId, data));
    }

    // Удаление --------------------------------------------------------------------------------------------------------
    @DeleteMapping("/delete/dish/{dishId}")
    public ResponseEntity<?> deleteDish(@PathVariable Long dishId) {
        return ResponseEntity.ok(dishService.delete(dishId));
    }

    @DeleteMapping("/delete/notification/{notificationId}")
    public ResponseEntity<?> deleteNotification(@PathVariable Long notificationId) {
        return ResponseEntity.ok(notificationService.deleteNotification(notificationId));
    }
}
