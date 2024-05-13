package com.example.backend.dining.controller.exception.customException;

public class ModificationException extends RuntimeException{
    public ModificationException(String message) {
        super(message);
    }
}
