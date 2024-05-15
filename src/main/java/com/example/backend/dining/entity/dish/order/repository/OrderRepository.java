package com.example.backend.dining.entity.dish.order.repository;

import com.example.backend.dining.entity.dish.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {
    boolean existsByDateAndChildId(LocalDate date, Long childId);

    @Query("SELECT o FROM Order o WHERE (o.date BETWEEN :startDate AND :endDate)")
    Set<Order> findOverlappingOrders(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT o FROM Order o JOIN FETCH o.details WHERE o.id = :orderId")
    Optional<Order> findOrderByIdFetch(Long orderId);

    @Query("SELECT o FROM Order o JOIN FETCH o.details WHERE o.date = :date")
    List<Order> findOrdersByDateFetch(@Param("date") LocalDate date);
}
