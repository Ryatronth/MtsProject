package com.example.backend.entity.user.repository;

import com.example.backend.entity.user.ChildGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<ChildGroup, String>, JpaSpecificationExecutor<ChildGroup> {
}
