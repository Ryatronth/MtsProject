package com.example.backend.dining.entity.dish.menu.repository;

import com.example.backend.dining.entity.dish.menu.Dish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DishRepository extends JpaRepository<Dish, Long>, JpaSpecificationExecutor<Dish> {
    Optional<Dish> findByName(String name);
}
