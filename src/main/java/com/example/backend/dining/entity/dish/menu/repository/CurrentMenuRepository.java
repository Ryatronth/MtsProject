package com.example.backend.dining.entity.dish.menu.repository;

import com.example.backend.dining.entity.dish.menu.CurrentMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface CurrentMenuRepository extends JpaRepository<CurrentMenu, Long>, JpaSpecificationExecutor<CurrentMenu> {
    @Query("SELECT cm FROM CurrentMenu cm JOIN FETCH cm.dishes WHERE cm.id = :menuId")
    Optional<CurrentMenu> findMenuByIdFetch(Long menuId);
    @Query("SELECT cm FROM CurrentMenu cm WHERE :date BETWEEN cm.startDate and cm.endDate")
    Optional<CurrentMenu> findMenuByDate(LocalDate date);
}
