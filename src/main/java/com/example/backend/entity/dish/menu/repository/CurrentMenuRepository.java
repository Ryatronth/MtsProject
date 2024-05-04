package com.example.backend.entity.dish.menu.repository;

import com.example.backend.entity.dish.menu.CurrentMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Set;

@Repository
public interface CurrentMenuRepository extends JpaRepository<CurrentMenu, Long>, JpaSpecificationExecutor<CurrentMenu> {
    @Query("SELECT cm FROM CurrentMenu cm WHERE (cm.startDate BETWEEN :startDate AND :endDate) OR (cm.endDate BETWEEN :startDate AND :endDate)")
    Set<CurrentMenu> findOverlappingMenus(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}
