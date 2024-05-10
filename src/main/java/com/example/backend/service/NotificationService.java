package com.example.backend.service;

import com.example.backend.controller.exception.customException.CreationException;
import com.example.backend.entity.notification.Notification;
import com.example.backend.entity.notification.NotificationRepository;
import com.example.backend.entity.user.User;
import com.example.backend.entity.user.repository.UserRepository;
import com.example.backend.payload.response.DeleteResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import com.example.backend.service.entityProcessing.entityFilter.EntityFilterService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;

    private final EntityFilterService entityFilterService;

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

    @Scheduled(cron = "0 0 9 * * *")
    public void sendMenuNotify() {
        LocalDate currentDate = LocalDate.now();
        LocalDate searchDate = currentDate.plusDays(3);
        if (entityFilterService.getMenu("date", searchDate).isEmpty()) {
            createNotification(userRepository.findByUsername("worker").orElseThrow(()
                            -> new CreationException("Уведомление не создано. Работник не найден")),
                    "Составьте меню на " + searchDate + ".");
        }
    }
}
