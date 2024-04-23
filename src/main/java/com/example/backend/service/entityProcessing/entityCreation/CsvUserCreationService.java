package com.example.backend.service.entityProcessing.entityCreation;

import com.example.backend.payload.response.CreationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CsvUserCreationService {

    private final UserCreationService userCreationService;

    public <T> List<T> readFile(MultipartFile file, T dto) {
        try (ByteArrayInputStream stream = new ByteArrayInputStream(file.getBytes());) {
            int data;
            while ((data = stream.read()) != -1) {
                System.out.println((char) data);
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return new ArrayList<>();
    }
}
