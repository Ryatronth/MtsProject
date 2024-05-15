package com.example.backend.dining.service.util;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;


@FunctionalInterface
public interface FiltrationCriteria<T> {
    Predicate doFilter(String key, Object Value, Root<T> root, CriteriaBuilder builder);
}
