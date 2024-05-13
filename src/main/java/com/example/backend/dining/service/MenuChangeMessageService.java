package com.example.backend.dining.service;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuChangeMessageService {
    private final RabbitTemplate rabbitTemplate;

    public void sendMenuChange(List<Long> childrenId) {
        rabbitTemplate.convertAndSend("application", "menu.change", childrenId);
    }
}
