package com.example.backend.service.entityProcessing.entityCreation;

import com.example.backend.payload.response.CreationResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Log4j2
@Service
public class EntityBuilder {
    public <T, U> CreationResponse createEntity(T data, JpaRepository<U, ?> repository, Function<T, U> entityBuilder,
                                                EntityExistenceCondition<T> existenceCondition) {
        if (existenceCondition.test(data)) {
            return CreationResponse.builder()
                    .status(ResponseStatus.ERROR)
                    .message("Сущность с данными параметрами уже существует")
                    .build();
        }

        U entity = entityBuilder.apply(data);

        U savedEntity = repository.save(entity);

        log.info("Сущность успешно создана: " + entity);
        return CreationResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .object(savedEntity)
                .message("Сущность создана успешно")
                .build();
    }
}
