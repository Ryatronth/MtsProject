package com.example.backend.entity.dish.menu.repository;

import com.example.backend.entity.dish.menu.MenuDish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuDishRepository extends JpaRepository<MenuDish, Long> {
}
