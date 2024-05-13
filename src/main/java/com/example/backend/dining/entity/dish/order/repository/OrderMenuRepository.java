package com.example.backend.dining.entity.dish.order.repository;

import com.example.backend.dining.entity.dish.menu.MenuDish;
import com.example.backend.dining.entity.dish.order.Order;
import com.example.backend.dining.entity.dish.order.OrderMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderMenuRepository extends JpaRepository<OrderMenu, Long>, JpaSpecificationExecutor<OrderMenu> {
    Optional<OrderMenu> findByOrderAndMenuDish(Order order, MenuDish menuDish);
}
