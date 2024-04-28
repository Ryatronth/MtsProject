package com.example.backend.controller.exception.customException;

public class ModificationException extends RuntimeException{
    public ModificationException(String message) {
        super(message);
    }
}
