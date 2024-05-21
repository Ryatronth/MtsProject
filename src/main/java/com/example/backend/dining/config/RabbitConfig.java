package com.example.backend.dining.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class RabbitConfig {
    @Bean
    public Jackson2JsonMessageConverter converter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public Declarables declarables() {
        Queue menuQueue = new Queue("menu.change", false);
        Queue ordersDeleteQueue = new Queue("orders.delete", false);
        Queue workerMenuChangeQueue = new Queue("worker.menu.change", false);
        DirectExchange exchange = new DirectExchange("application");
        return new Declarables(menuQueue,
                ordersDeleteQueue,
                workerMenuChangeQueue,
                exchange,
                BindingBuilder.bind(menuQueue).to(exchange).with("menu.change"),
                BindingBuilder.bind(workerMenuChangeQueue).to(exchange).with("worker.menu.change"),
                BindingBuilder.bind(ordersDeleteQueue).to(exchange).with("orders.delete"));
    }
}
