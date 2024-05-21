package com.example.backend.dining.service;

import com.example.backend.dining.controller.exception.customException.CreationException;
import com.example.backend.dining.entity.dish.menu.CurrentMenu;
import com.example.backend.dining.entity.notification.Notification;
import com.example.backend.dining.entity.notification.NotificationRepository;
import com.example.backend.dining.entity.user.Parent;
import com.example.backend.dining.entity.user.User;
import com.example.backend.dining.entity.user.repository.UserRepository;
import com.example.backend.dining.payload.response.DeleteResponse;
import com.example.backend.dining.service.entityProcessing.MenuService;
import com.example.backend.dining.service.entityProcessing.ParentService;
import com.example.backend.security.entity.RoleName;
import com.example.backend.totalPayload.enums.ResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.AmqpRejectAndDontRequeueException;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;

   private final MenuService menuService;
   private final ParentService parentService;

    public void createNotification(User user, String message) {
        LocalTime time = LocalTime.now().withNano(0);
        LocalDate date = LocalDate.now();
        if (notificationRepository.existsByMessageAndUserAndDateAndTime(message, user, date, time)) {
            return;
        }

        Notification notification = Notification.builder()
                .user(user)
                .message(message)
                .date(date)
                .time(time)
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

    @RabbitListener(queues = "menu.change")
    public void handleMenuChangedEvent(List<User> users) {
        users.forEach(user -> {
            if (user == null) throw new AmqpRejectAndDontRequeueException("У ребенка должен быть определен родитель");
            createNotification(user, "Меню было изменено. Пожалуйста, составьте меню для своих детей заново.");
        });
    }

    @RabbitListener(queues = "worker.menu.change")
    public void handleMenuChangeEventToWorker(String message) {
        User worker = userRepository.findByUsername("worker").orElseThrow(() -> new AmqpRejectAndDontRequeueException("Работник не найден"));
        createNotification(worker, message);
    }

    @Scheduled(cron = "0 0 9 * * *")
    public void sendMenuNotify() {
        LocalDate currentDate = LocalDate.now();
        LocalDate searchDate = currentDate.plusDays(3);
        if (menuService.filtrate("date", searchDate).isEmpty()) {
            createNotification(userRepository.findByUsername("worker").orElseThrow(() -> new CreationException("Уведомление не создано. Работник не найден")),
                    "Составьте меню на " + searchDate + ".");
        }
    }

    @Scheduled(cron = "0 0 9 * * *")
    public void sendPaymentNotify() {
        LocalDate currentDate = LocalDate.now();
        List<CurrentMenu> menus = menuService.filtrate("date", currentDate);
        if (!menus.isEmpty()) {
            CurrentMenu menu = menus.getFirst();
            if (menu.getEndDate().equals(currentDate)) {
                List<User> users = parentService.filtrate("role", RoleName.PARENT).stream().map(Parent::getUser).toList();
                users.forEach(o -> createNotification(o, "Не забудьте оплатить заказы ваших детей."));
            }
        }
    }
}
