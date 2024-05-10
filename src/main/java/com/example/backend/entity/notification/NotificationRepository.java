package com.example.backend.entity.notification;

import com.example.backend.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long>, JpaSpecificationExecutor<Notification> {
    Set<Notification> findAllByUserId(Long userId);
    boolean existsByMessageAndUserAndDateAndTime(String message, User user, String date, String time);
}
