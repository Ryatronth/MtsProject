package com.example.backend.dining.aop;

import org.aspectj.lang.annotation.Pointcut;

public class Pointcuts {
    @Pointcut("execution(* com.example.backend.dining.service.entityProcessing.entityCreation.EntityCreationService.create*(..))")
    public void pointCreate() {}

    @Pointcut("execution(* com.example.backend.dining.service.entityProcessing.entityFilter.EntityFilterService.get*(..))")
    public void pointGet() {}

    @Pointcut("execution(* com.example.backend.dining.service.entityProcessing.entityModification.EntityModificationService.update*(..))")
    public void pointUpdate() {}

    @Pointcut("execution(* com.example.backend.dining.service.NotificationService.createNotification(..))")
    public void pointNotification() {}

    @Pointcut("execution(* com.example.backend.dining.service..*(..))")
    public void pointException() {}
}
