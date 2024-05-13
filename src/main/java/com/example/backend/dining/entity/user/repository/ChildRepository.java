package com.example.backend.dining.entity.user.repository;

import com.example.backend.dining.entity.user.Child;
import com.example.backend.dining.entity.user.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChildRepository extends JpaRepository<Child, Long>, JpaSpecificationExecutor<Child> {
    @Modifying
    @Query("UPDATE Child c SET c.parent = :parent WHERE c.id IN :childIds")
    void updateParent(@Param("parent") Parent parent, @Param("childIds") List<Long> childIds);

    @Modifying
    @Query("UPDATE Child c SET c.parent = null WHERE c.parent = :parent")
    void deleteParent(@Param("parent") Parent parent);
}
