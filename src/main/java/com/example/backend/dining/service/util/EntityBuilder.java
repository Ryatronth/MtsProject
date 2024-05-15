package com.example.backend.dining.service.util;

import com.example.backend.dining.controller.exception.customException.CreationException;
import com.example.backend.dining.payload.response.CreationResponse;
import com.example.backend.totalPayload.enums.ResponseStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.function.Function;
import java.util.function.Predicate;


public class EntityBuilder {
    public static <T, U> CreationResponse<U> createEntity(T data,
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

        return CreationResponse
                .<U>builder()
                .status(ResponseStatus.SUCCESS)
                .object(savedEntity)
                .message(successMessage)
                .build();
    }
}
