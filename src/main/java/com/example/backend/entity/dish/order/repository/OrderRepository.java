package com.example.backend.entity.dish.order.repository;

import com.example.backend.entity.dish.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Set;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {
    boolean existsByDateAndChildId(LocalDate date, Long childId);
    @Query("SELECT o FROM Order o WHERE (o.date BETWEEN :startDate AND :endDate)")
    Set<Order> findOverlappingOrders(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}
