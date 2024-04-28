package com.example.backend.service.entityProcessing.entityCreation;

import com.example.backend.controller.exception.customException.CreationException;
import com.example.backend.payload.response.CreationResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.function.Function;
import java.util.function.Predicate;

@Service
public class EntityBuilder {
    public <T, U> CreationResponse createEntity(T data,
                                                JpaRepository<U, ?> repository,
                                                Function<T, U> entityBuilder,
                                                Predicate<T> existenceCondition,
                                                String successMessage,
                                                String errorMessage) {
        if (existenceCondition.test(data)) {
            throw new CreationException(errorMessage);
        }

        U entity = entityBuilder.apply(data);

        U savedEntity = repository.save(entity);

        return CreationResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .object(savedEntity)
                .message(successMessage)
                .build();
    }
}
