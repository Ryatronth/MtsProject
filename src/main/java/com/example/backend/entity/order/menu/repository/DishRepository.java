package com.example.backend.entity.order.menu.repository;

import com.example.backend.entity.order.menu.Dish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DishRepository extends JpaRepository<Dish, Long> {
}
