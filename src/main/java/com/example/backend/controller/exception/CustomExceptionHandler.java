package com.example.backend.controller.exception;

import com.example.backend.controller.exception.customException.CreationException;
import com.example.backend.controller.exception.customException.ModificationException;
import com.example.backend.payload.response.CreationResponse;
import com.example.backend.payload.response.ModificationResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(CreationException.class)
    public ResponseEntity<?> handleCreationException(CreationException ex) {
        return ResponseEntity.status(400).body(CreationResponse.builder()
                .status(ResponseStatus.ERROR)
                .message(ex.getMessage())
                .build());
    }

    @ExceptionHandler(ModificationException.class)
    public ResponseEntity<?> handleModificationException(ModificationException ex) {
        return ResponseEntity.status(400).body(ModificationResponse.builder()
                .status(ResponseStatus.ERROR)
                .message(ex.getMessage())
                .build());
    }
}
