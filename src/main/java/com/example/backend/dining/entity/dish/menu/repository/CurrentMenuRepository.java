package com.example.backend.dining.entity.dish.menu.repository;

import com.example.backend.dining.entity.dish.menu.CurrentMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CurrentMenuRepository extends JpaRepository<CurrentMenu, Long>, JpaSpecificationExecutor<CurrentMenu> {
}
