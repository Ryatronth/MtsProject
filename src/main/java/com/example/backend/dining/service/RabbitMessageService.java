package com.example.backend.dining.service;

import com.example.backend.dining.entity.dish.menu.CurrentMenu;
import com.example.backend.dining.entity.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RabbitMessageService {
    private final RabbitTemplate rabbitTemplate;

    public void sendRefreshOrders(List<User> users) {
        rabbitTemplate.convertAndSend("application", "menu.change", users);
    }

    public void sendDeleteOrders(CurrentMenu currentMenu) {
        rabbitTemplate.convertAndSend("application", "orders.delete", currentMenu);
    }

    public void sendUpdateMenu(String message) {
        rabbitTemplate.convertAndSend("application", "worker.menu.change", message);
    }
}
