package com.example.backend.dining.controller.exception;

import com.example.backend.dining.controller.exception.customException.CreationException;
import com.example.backend.dining.controller.exception.customException.FilterException;
import com.example.backend.dining.controller.exception.customException.ImageProcessException;
import com.example.backend.dining.controller.exception.customException.ModificationException;
import com.example.backend.totalPayload.enums.ResponseStatus;
import com.example.backend.totalPayload.response.ExceptionResponse;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@RestControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler({CreationException.class, ModificationException.class, FilterException.class, ImageProcessException.class, EntityNotFoundException.class})
    public ResponseEntity<?> handleEntityException(Exception ex) {
        return ResponseEntity.status(400).body(ExceptionResponse.builder()
                .status(ResponseStatus.ERROR)
                .message(ex.getMessage())
                .build());
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<?> handleValidationException(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream().map(o -> o.getField().toUpperCase(Locale.ROOT) + ": " + o.getDefaultMessage()).collect(Collectors.joining(". "));
        return ResponseEntity.status(400).body(ExceptionResponse.builder()
                .status(ResponseStatus.ERROR)
                .message(message)
                .build());
    }

    @ExceptionHandler({ConstraintViolationException.class})
    public ResponseEntity<?> handleValidationException(ConstraintViolationException ex) {
        String message = ex.getConstraintViolations().stream().map(o -> List.of(o.getPropertyPath().toString().split("\\.")).getLast().toUpperCase(Locale.ROOT) + ": " + o.getMessage()).collect(Collectors.joining(". "));
        return ResponseEntity.status(400).body(ExceptionResponse.builder()
                .status(ResponseStatus.ERROR)
                .message(message)
                .build());
    }
}
