package com.example.backend.dining.entity.dish.menu.repository;

import com.example.backend.dining.entity.dish.menu.Dish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DishRepository extends JpaRepository<Dish, Long>, JpaSpecificationExecutor<Dish> {
    List<Dish> findAllByName(String name);
}
