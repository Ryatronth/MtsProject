package com.example.backend.security.aop;

import com.example.backend.security.controller.exception.customException.LoginException;
import lombok.extern.log4j.Log4j2;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;


@Component
@Aspect
@Log4j2
public class SecurityAspects {
    @Around("com.example.backend.security.aop.SecurityPointcuts.loginPointcut()")
    public Object loginAdvice(ProceedingJoinPoint pjp) {
        try {
            Object result = pjp.proceed();
            log.info("Аутентификация успешна: {}", pjp.getArgs());
            return result;
        } catch (Throwable ex) {
            log.error("Неверные учетные данные: {}", pjp.getArgs());
            throw new LoginException("Неверные учетные данные");
        }
    }
}
