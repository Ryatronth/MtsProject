package com.example.backend.entity.order.menu.repository;

import com.example.backend.entity.order.menu.CurrentMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CurrentMenuRepository extends JpaRepository<CurrentMenu, Long> {
}
