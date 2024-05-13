package com.example.backend.dining.aop;

import lombok.extern.log4j.Log4j2;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@Aspect
@Log4j2
public class Aspects {
    @AfterReturning("com.example.backend.dining.aop.Pointcuts.pointCreate()")
    public void creationAdviceReturn(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();
        log.info("Сущность успешно создана: {}", Arrays.toString(args));
    }

    @AfterReturning("com.example.backend.dining.aop.Pointcuts.pointGet()")
    public void getAdviceReturn(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();
        log.info("Сущности успешно получены: {}", Arrays.toString(args));
    }

    @AfterReturning("com.example.backend.dining.aop.Pointcuts.pointUpdate()")
    public void updateAdviceReturn(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();
        log.info("Сущность успешно изменена: {}", Arrays.toString(args));
    }

    @After("com.example.backend.dining.aop.Pointcuts.pointNotification()")
    public void notificationAdviceReturn(JoinPoint joinPoint) {
        log.info("Создано уведомление: {}", joinPoint.getArgs());
    }

    @AfterThrowing(pointcut = "com.example.backend.dining.aop.Pointcuts.pointException()", throwing = "exception")
    public void adviceThrow(JoinPoint joinPoint, Throwable exception) {
        Object[] args = joinPoint.getArgs();
        String methodName = joinPoint.getSignature().getName();
        log.error("Ошибка: {}. Ошибка при вызове метода {} с аргументами: {}", exception.getMessage(), methodName, Arrays.toString(args));
    }
}
