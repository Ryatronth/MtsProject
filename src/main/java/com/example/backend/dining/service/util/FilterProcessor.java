package com.example.backend.dining.service.util;

import com.example.backend.dining.controller.exception.customException.FilterException;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FilterProcessor {
    public static <T> Specification<T> createSpec(FiltrationCriteria<T> criteria, Object... values) {
        return (root, query, builder) -> {
            try {
                Map<String, Object> filters = createFilters(values);
                List<Predicate> predicates = new ArrayList<>();
                for (Map.Entry<String, Object> entry : filters.entrySet()) {
                    String key = entry.getKey();
                    Object value = entry.getValue();

                    Predicate predicate = criteria.doFilter(key, value, root, builder);

                    predicates.add(predicate);
                }
                return builder.and(predicates.toArray(new Predicate[0]));
            } catch (Exception ex) {
                throw new FilterException(ex.getMessage());
            }
        };
    }

    private static Map<String, Object> createFilters(Object... values) {
        Map<String, Object> filters = new HashMap<>();
        for (int i = 0; i < values.length - 1; i += 2) {
            if (values[i + 1] != null) {
                filters.put(values[i].toString(), values[i + 1]);
            }
        }
        return filters;
    }
}
