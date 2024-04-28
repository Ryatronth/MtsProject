package com.example.backend.entity.dish.order.repository;

import com.example.backend.entity.dish.order.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetailsRepository extends JpaRepository<OrderDetails, Long> {
}
