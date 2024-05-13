package com.example.backend.security.aop;

import org.aspectj.lang.annotation.Pointcut;

public class SecurityPointcuts {
    @Pointcut("execution(* com.example.backend.security.service.AuthenticationService.login(..))")
    public void loginPointcut() {}
}
