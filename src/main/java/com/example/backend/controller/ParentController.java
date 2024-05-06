package com.example.backend.controller;

import com.example.backend.payload.dto.OrderDTO;
import com.example.backend.payload.dto.UpdateOrderDTO;
import com.example.backend.service.NotificationService;
import com.example.backend.service.entityProcessing.entityCreation.EntityCreationService;
import com.example.backend.service.entityProcessing.entityFilter.EntityFilterService;
import com.example.backend.service.entityProcessing.entityModification.EntityModificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Set;

@RestController
@RequestMapping("/api/user/parent")
@RequiredArgsConstructor
public class ParentController {
    private final EntityCreationService entityCreationService;
    private final EntityModificationService entityModificationService;
    private final EntityFilterService entityFilterService;

    private final NotificationService notificationService;

    // Получение -------------------------------------------------------------------------------------------------------
    @GetMapping("/get/children")
    public ResponseEntity<?> getChildren(@RequestParam(name = "id", required = false) Long id,
                                         @RequestParam(name = "parentId", required = false) Long parent) {
        return ResponseEntity.ok(entityFilterService.getChildren("id", id, "parent", parent));
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

    @GetMapping("/get/order")
    public ResponseEntity<?> getOrder(@RequestParam(name = "id", required = false) Long id,
                                      @RequestParam(name = "date", required = false) LocalDate date,
                                      @RequestParam(name = "childId", required = false) Long childId) {
        return ResponseEntity.ok(entityFilterService.getOrder("id", id, "date", date, "child", childId));
    }

    @GetMapping("/get/order/dishes")
    public ResponseEntity<?> getOrderDishes(@RequestParam(name = "id", required = false) Long id,
                                            @RequestParam(name = "orderId", required = false) Long orderId) {
        return ResponseEntity.ok(entityFilterService.getOrderMenu("id", id, "order", orderId));
    }

    @GetMapping("/get/notifications/{userId}")
    public ResponseEntity<?> getNotifications(@PathVariable Long userId) {
        return ResponseEntity.ok(notificationService.getUserNotification(userId));
    }

    // Создание --------------------------------------------------------------------------------------------------------
    @PostMapping("/child/order/create")
    public ResponseEntity<?> createOrder(@RequestBody Set<OrderDTO> data) {
        return ResponseEntity.ok(entityCreationService.createOrders(data));
    }

    // Изменение -------------------------------------------------------------------------------------------------------
    @PostMapping("/child/order/{orderId}/update")
    public ResponseEntity<?> updateOrder(@PathVariable Long orderId, @RequestBody UpdateOrderDTO data) {
        return ResponseEntity.ok(entityModificationService.updateOrder(orderId, data));
    }

    // Удаление --------------------------------------------------------------------------------------------------------
    @DeleteMapping("/delete/notification/{notificationId}")
    public ResponseEntity<?> deleteNotification(@PathVariable Long notificationId) {
        return ResponseEntity.ok(notificationService.deleteNotification(notificationId));
    }
}
