package com.example.backend.service;

import com.example.backend.entity.notification.Notification;
import com.example.backend.entity.notification.NotificationRepository;
import com.example.backend.entity.user.User;
import com.example.backend.payload.response.DeleteResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public void createNotification(User user, String message) {
        if (notificationRepository.existsByMessageAndUser(message, user)) {
            return;
        }

        Notification notification = Notification.builder()
                .user(user)
                .message(message)
                .build();

        notificationRepository.save(notification);
    }

    public Set<Notification> getUserNotification(Long userId) {
        return notificationRepository.findAllByUserId(userId);
    }

    public DeleteResponse deleteNotification(Long notificationId) {
        notificationRepository.deleteById(notificationId);
        return DeleteResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Уведомление удалено")
                .build();
    }
}
