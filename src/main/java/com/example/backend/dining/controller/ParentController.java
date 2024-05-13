package com.example.backend.dining.controller;

import com.example.backend.dining.payload.dto.OrderDTO;
import com.example.backend.dining.payload.dto.PaymentDTO;
import com.example.backend.dining.payload.dto.PaymentInfoDTO;
import com.example.backend.dining.payload.dto.UpdateOrderDTO;
import com.example.backend.dining.service.NotificationService;
import com.example.backend.dining.service.PaymentService;
import com.example.backend.dining.service.entityProcessing.entityCreation.EntityCreationService;
import com.example.backend.dining.service.entityProcessing.entityFilter.EntityFilterService;
import com.example.backend.dining.service.entityProcessing.entityModification.EntityModificationService;
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
    private final EntityCreationService entityCreationService;
    private final EntityModificationService entityModificationService;
    private final EntityFilterService entityFilterService;

    private final NotificationService notificationService;
    private final PaymentService paymentService;

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

    @GetMapping("/get/orders/startDate/{startDate}/endDate/{endDate}/childId/{childId}")
    public ResponseEntity<?> getOrdersForPay(@PathVariable Long childId, @PathVariable LocalDate endDate, @PathVariable LocalDate startDate) {
        return ResponseEntity.ok(paymentService.getPaymentInfo(PaymentInfoDTO.builder()
                .childId(childId)
                .endDate(endDate)
                .startDate(startDate)
                .build()));
    }

    // Создание --------------------------------------------------------------------------------------------------------
    @PostMapping("/child/order/create")
    public ResponseEntity<?> createOrder(@RequestBody Set<@Valid OrderDTO> data) {
        return ResponseEntity.ok(entityCreationService.createOrders(data));
    }

    // Изменение -------------------------------------------------------------------------------------------------------
    @PostMapping("/child/order/{orderId}/update")
    public ResponseEntity<?> updateOrder(@PathVariable Long orderId, @RequestBody @Validated UpdateOrderDTO data) {
        return ResponseEntity.ok(entityModificationService.updateOrder(orderId, data));
    }

    @PostMapping("/child/orders/pay")
    public ResponseEntity<?> pay(@RequestBody @Validated PaymentDTO data) {
        return ResponseEntity.ok(paymentService.pay(data));
    }

    // Удаление --------------------------------------------------------------------------------------------------------
    @DeleteMapping("/delete/notification/{notificationId}")
    public ResponseEntity<?> deleteNotification(@PathVariable Long notificationId) {
        return ResponseEntity.ok(notificationService.deleteNotification(notificationId));
    }
}
