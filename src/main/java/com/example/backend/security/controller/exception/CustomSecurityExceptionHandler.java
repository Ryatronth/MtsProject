package com.example.backend.security.controller.exception;

import com.example.backend.security.controller.exception.customException.LoginException;
import com.example.backend.security.controller.exception.customException.RefreshException;
import com.example.backend.totalPayload.enums.ResponseStatus;
import com.example.backend.totalPayload.response.ExceptionResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomSecurityExceptionHandler {
    @ExceptionHandler({LoginException.class, RefreshException.class})
    public ResponseEntity<?> handleCreationException(LoginException ex) {
        return ResponseEntity.status(400).body(ExceptionResponse.builder()
                .status(ResponseStatus.ERROR)
                .message(ex.getMessage())
                .build());
    }
}
