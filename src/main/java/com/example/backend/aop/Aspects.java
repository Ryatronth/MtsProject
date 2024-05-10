package com.example.backend.aop;

import lombok.extern.log4j.Log4j2;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@Aspect
@Log4j2
public class Aspects {
    @AfterReturning("Pointcuts.pointCreate()")
    public void creationAdviceReturn(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();
        log.info("Сущность успешно создана: {}", Arrays.toString(args));
    }

    @AfterReturning("Pointcuts.pointGet()")
    public void getAdviceReturn(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();
        log.info("Сущности успешно получены: {}", Arrays.toString(args));
    }

    @AfterReturning("Pointcuts.pointUpdate()")
    public void updateAdviceReturn(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();
        log.info("Сущность успешно изменена: {}", Arrays.toString(args));
    }

    @AfterReturning("Pointcuts.pointNotification()")
    public void notificationAdviceReturn() {
        log.info("Уведомление успешно создано");
    }

    @AfterThrowing(pointcut = "Pointcuts.pointException()", throwing = "exception")
    public void adviceThrow(JoinPoint joinPoint, Throwable exception) {
        Object[] args = joinPoint.getArgs();
        String methodName = joinPoint.getSignature().getName();
        log.error("Ошибка: {}. Ошибка при вызове метода {} с аргументами: {}",exception.getMessage(), methodName, Arrays.toString(args));
    }
}
