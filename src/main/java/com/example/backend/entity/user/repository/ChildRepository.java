package com.example.backend.entity.user.repository;

import com.example.backend.entity.user.Child;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChildRepository extends JpaRepository<Child, Long> {
    List<Child> findAllByParentId(Long parentId);
    List<Child> findAllByChildGroupId(String groupId);
}
