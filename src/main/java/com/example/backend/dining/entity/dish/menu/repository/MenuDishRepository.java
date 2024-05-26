package com.example.backend.dining.entity.dish.menu.repository;

import com.example.backend.dining.entity.dish.menu.CurrentMenu;
import com.example.backend.dining.entity.dish.menu.Dish;
import com.example.backend.dining.entity.dish.menu.MenuDish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MenuDishRepository extends JpaRepository<MenuDish, Long>, JpaSpecificationExecutor<MenuDish> {
    Optional<MenuDish> findByCurrentMenuAndDish(CurrentMenu menu, Dish dishId);
}
