package com.example.backend.dining.service;

import com.example.backend.dining.controller.exception.customException.ImageProcessException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImageService {
    public String saveImage(MultipartFile image) {
        try {
            if (image.isEmpty()) {
                throw new ImageProcessException("Файл пуст");
            }

            byte[] bytes = image.getBytes();

            String UPLOAD_DIR = "../images/dish/";

            String filename = UUID.randomUUID().toString();

            Path path = Paths.get(UPLOAD_DIR + filename);
            Files.write(path, bytes);

            return path.toString().replace("\\", "/");
        } catch (Exception ex) {
            throw new ImageProcessException("Ошибка при сохранении изображения");
        }
    }

    public void deleteImage(String path) {
        File oldImage = new File(path);
        oldImage.delete();
    }

    public String refactorPath(String path) {
        return "http://localhost:8080" + path.substring(2);
    }
}
