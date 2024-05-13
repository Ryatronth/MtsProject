package com.example.backend.dining.service;

import com.example.backend.dining.controller.exception.customException.ModificationException;
import com.example.backend.dining.entity.dish.order.Order;
import com.example.backend.dining.entity.dish.order.repository.OrderRepository;
import com.example.backend.dining.payload.dto.PaymentDTO;
import com.example.backend.dining.payload.dto.PaymentInfoDTO;
import com.example.backend.dining.payload.response.PaymentInfoResponse;
import com.example.backend.dining.payload.response.PaymentResponse;
import com.example.backend.dining.service.entityProcessing.entityFilter.EntityFilterService;
import com.example.backend.totalPayload.enums.ResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final OrderRepository orderRepository;

    private final EntityFilterService entityFilterService;

    public PaymentInfoResponse getPaymentInfo(PaymentInfoDTO data) {
        List<Order> orders = entityFilterService.getOrder("startDate", data.getStartDate(), "endDate", data.getEndDate(), "child", data.getChildId(), "isPaid", false);
        Double totalPrice = orders.stream().map(Order::getTotalPrice).reduce(0.0, Double::sum);
        return PaymentInfoResponse.builder()
                .orders(orders)
                .totalPrice(totalPrice)
                .build();
    }

    public PaymentResponse pay(PaymentDTO data) {
        for (long id : data.getOrders()) {
            Order order = orderRepository.findById(id).orElseThrow(() -> new ModificationException("Заказ не найден"));
            order.setPaid(true);
            orderRepository.save(order);
        }
        return PaymentResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Меню успешно оплачено")
                .build();
    }
}
