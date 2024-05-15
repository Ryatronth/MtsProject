package com.example.backend.dining.aop;

import org.aspectj.lang.annotation.Pointcut;

public class Pointcuts {
    @Pointcut("execution(* com.example.backend.dining.service.*.create(..)) ")
    public void pointCreate() {}

    @Pointcut("execution(* com.example.backend.dining.service.*.filtrate(..))")
    public void pointGet() {}

    @Pointcut("execution(* com.example.backend.dining.service.*.modify(..))")
    public void pointUpdate() {}

    @Pointcut("execution(* com.example.backend.dining.service.NotificationService.createNotification(..))")
    public void pointNotification() {}

    @Pointcut("execution(* com.example.backend.dining.service..*(..))")
    public void pointException() {}
}
