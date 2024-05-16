package com.example.backend.dining.controller;

import com.example.backend.dining.payload.dto.OrderDTO;
import com.example.backend.dining.payload.dto.UpdateOrderDTO;
import com.example.backend.dining.service.*;
import com.example.backend.dining.service.entityProcessing.ChildService;
import com.example.backend.dining.service.entityProcessing.MenuService;
import com.example.backend.dining.service.entityProcessing.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Set;

@RestController
@RequestMapping("/api/user/parent")
@RequiredArgsConstructor
@Validated
public class ParentController {
    private final NotificationService notificationService;
    private final PaymentService paymentService;

    private final ChildService childService;
    private final MenuService menuService;
    private final OrderService orderService;

    // Получение -------------------------------------------------------------------------------------------------------
    @GetMapping("/get/children")
    public ResponseEntity<?> getChildren(@RequestParam(name = "id", required = false) Long id,
                                         @RequestParam(name = "parentId", required = false) Long parent) {
        return ResponseEntity.ok(childService.filtrate("id", id, "parent", parent));
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

    @GetMapping("/get/orders")
    public ResponseEntity<?> getOrder(@RequestParam(name = "id", required = false) Long id,
                                      @RequestParam(name = "date", required = false) LocalDate date,
                                      @RequestParam(name = "childId", required = false) Long childId) {
        return ResponseEntity.ok(orderService.filtrate("id", id, "date", date, "child", childId));
    }

    @GetMapping("/get/order/{orderId}/dishes")
    public ResponseEntity<?> getOrderDishes(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.getOrderMenu(orderId));
    }

    @GetMapping("/get/notifications/{userId}")
    public ResponseEntity<?> getNotifications(@PathVariable Long userId) {
        return ResponseEntity.ok(notificationService.getUserNotification(userId));
    }

    @GetMapping("/child/{childId}/get/payment")
    public ResponseEntity<?> getOrdersForPay(@PathVariable Long childId) {
        return ResponseEntity.ok(paymentService.getPaymentInfo(childId));
    }

    // Создание --------------------------------------------------------------------------------------------------------
    @PostMapping("/child/order/create")
    public ResponseEntity<?> createOrder(@RequestBody Set<@Valid OrderDTO> data) {
        return ResponseEntity.ok(orderService.createAll(data));
    }

    // Изменение -------------------------------------------------------------------------------------------------------
    @PutMapping("/child/order/{orderId}/update")
    public ResponseEntity<?> updateOrder(@PathVariable Long orderId, @RequestBody @Validated UpdateOrderDTO data) {
        return ResponseEntity.ok(orderService.modify(orderId, data));
    }

    @PutMapping("/child/{childId}/orders/pay")
    public ResponseEntity<?> pay(@PathVariable(name = "childId") Long childId) {
        return ResponseEntity.ok(paymentService.pay(childId));
    }


    // Удаление --------------------------------------------------------------------------------------------------------
    @DeleteMapping("/delete/notification/{notificationId}")
    public ResponseEntity<?> deleteNotification(@PathVariable Long notificationId) {
        return ResponseEntity.ok(notificationService.deleteNotification(notificationId));
    }
}
