package com.example.backend.service.entityProcessing.entityCreation;

@FunctionalInterface
public interface EntityExistenceCondition<T> {
    boolean test(T data);
}
