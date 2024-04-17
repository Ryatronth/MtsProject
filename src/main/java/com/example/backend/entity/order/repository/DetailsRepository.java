package com.example.backend.entity.order.repository;

import com.example.backend.entity.order.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetailsRepository extends JpaRepository<OrderDetails, Long> {
}
