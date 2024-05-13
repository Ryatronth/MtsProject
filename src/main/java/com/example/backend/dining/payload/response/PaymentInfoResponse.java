package com.example.backend.dining.payload.response;

import com.example.backend.dining.entity.dish.order.Order;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class PaymentInfoResponse {
    private List<Order> orders;
    private Double totalPrice;
}
