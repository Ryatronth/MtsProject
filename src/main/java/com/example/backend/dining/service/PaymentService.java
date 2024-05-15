package com.example.backend.dining.service;

import com.example.backend.dining.entity.dish.order.Order;
import com.example.backend.dining.payload.dto.UpdateOrderDTO;
import com.example.backend.dining.payload.response.PaymentInfoResponse;
import com.example.backend.dining.payload.response.PaymentResponse;
import com.example.backend.totalPayload.enums.ResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final OrderService orderService;

    public PaymentInfoResponse getPaymentInfo(Long childId) {
        List<Order> orders = orderService.filtrate("isPaid", false, "toDate", LocalDate.now().minusDays(1), "child", childId);
        double totalPrice = orders.stream().map(Order::getTotalPrice).reduce(0.0, Double::sum);
        return PaymentInfoResponse.builder()
                .orders(orders)
                .totalPrice(totalPrice)
                .build();
    }

    public PaymentResponse pay(Long childId) {
        List<Order> orders = orderService.filtrate("isPaid", false, "toDate", LocalDate.now().minusDays(1), "child", childId);
        orders.forEach(o -> orderService.modify(o.getId(), UpdateOrderDTO.builder()
                    .toAdd(new HashSet<>())
                            .toDelete(new HashSet<>())
                            .isPaid(true)
                    .build())
        );
        return PaymentResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Заказы успешно оплачены")
                .build();
    }
}
