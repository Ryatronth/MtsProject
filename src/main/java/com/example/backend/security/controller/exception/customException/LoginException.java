package com.example.backend.security.controller.exception.customException;

import org.springframework.security.core.AuthenticationException;

public class LoginException extends AuthenticationException {
    public LoginException(String msg) {
        super(msg);
    }
}
