package com.example.backend.controller.exception.customException;

public class ImageProcessException extends RuntimeException{
    public ImageProcessException(String message) {
        super(message);
    }
}
