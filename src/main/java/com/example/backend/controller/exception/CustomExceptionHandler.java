package com.example.backend.controller.exception;

import com.example.backend.controller.exception.customException.CreationException;
import com.example.backend.controller.exception.customException.FilterException;
import com.example.backend.controller.exception.customException.ImageProcessException;
import com.example.backend.controller.exception.customException.ModificationException;
import com.example.backend.payload.response.ExceptionResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler({CreationException.class, ModificationException.class, FilterException.class, ImageProcessException.class})
    public ResponseEntity<?> handleCreationException(CreationException ex) {
        return ResponseEntity.status(400).body(ExceptionResponse.builder()
                .status(ResponseStatus.ERROR)
                .message(ex.getMessage())
                .build());
    }
}
