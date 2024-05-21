package com.example.backend.dining.entity.dish.menu.repository;

import com.example.backend.dining.entity.dish.menu.CurrentMenu;
import com.example.backend.dining.entity.dish.menu.Dish;
import com.example.backend.dining.entity.dish.menu.MenuDish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MenuDishRepository extends JpaRepository<MenuDish, Long>, JpaSpecificationExecutor<MenuDish> {
    Optional<MenuDish> findByCurrentMenuAndDish(CurrentMenu menu, Dish dishId);

    @Query("SELECT m FROM MenuDish m WHERE m.dish = :dish AND m.currentMenu IS NOT NULL AND m.currentMenu.endDate > :date")
    List<MenuDish> findAllByDish(@Param("dish") Dish dish, @Param("date") LocalDate date);
}
