package com.example.backend.service.entityProcessing.entityCreation;

import com.example.backend.payload.response.CreationResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class EntityBuilder {
    public <T, U> CreationResponse createEntity(T data, JpaRepository<U, ?> repository, Function<T, U> entityBuilder,
                                                EntityExistenceCondition<T> existenceCondition, String message) {
        if (existenceCondition.test(data)) {
            return CreationResponse.builder()
                    .status(ResponseStatus.ERROR)
                    .message(message)
                    .build();
        }

        U entity = entityBuilder.apply(data);

        U savedEntity = repository.save(entity);

        return CreationResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .object(savedEntity)
                .message("Сущность создана успешно")
                .build();
    }
}
