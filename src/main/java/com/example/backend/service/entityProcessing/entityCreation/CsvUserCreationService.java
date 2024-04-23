package com.example.backend.service.entityProcessing.entityCreation;

import com.example.backend.payload.response.CreationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CsvUserCreationService {

    private final UserCreationService userCreationService;

    public CreationResponse createFromFile() {
        return CreationResponse.builder().build();
    }
}
