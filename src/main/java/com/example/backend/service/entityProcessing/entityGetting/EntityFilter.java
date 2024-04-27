package com.example.backend.service.entityProcessing.entityGetting;

import com.example.backend.entity.user.ChildGroup;
import com.example.backend.entity.user.Parent;
import com.example.backend.entity.user.repository.GroupRepository;
import com.example.backend.entity.user.repository.ParentRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class EntityFilter {
    private final GroupRepository groupRepository;
    private final ParentRepository parentRepository;

    private final EntityManager entityManager;

    public <T> List<T> filtrate(Class<T> type, String... pairs) {
        Map<String, String> filterValues = createMap(pairs);

        CriteriaBuilder builder = entityManager.getCriteriaBuilder();

        CriteriaQuery<T> query = builder.createQuery(type);
        Root<T> root = query.from(type);

        List<Predicate> predicates = new ArrayList<>();

        for (Map.Entry<String, String> entry : filterValues.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();

            if (key.equals("parent") || value != null) {
                String lowerCaseValue = value == null ? null : value.toLowerCase();
                switch (key) {
                    case "childGroup" -> {
                        ChildGroup group = groupRepository.findById(value).orElse(null);
                        if (group == null) {
                            return Collections.emptyList();
                        }
                        predicates.add(builder.equal(root.get(key), group));
                    }
                    case "parent" -> {
                        if (value != null) {
                            Parent parent = parentRepository.findById(Long.valueOf(value)).orElse(null);
                            if (parent == null) {
                                return Collections.emptyList();
                            }
                            predicates.add(builder.equal(root.get(key), parent));
                        }
                        predicates.add(builder.isNull(root.get(key)));
                    }
                    default -> {
                        predicates.add(builder.like(builder.lower(root.get(key)), "%" + lowerCaseValue + "%"));
                    }
                }
            }
        }
        query.select(root).where(predicates.toArray(new Predicate[0]));

        return entityManager.createQuery(query).getResultList();
    }

    private Map<String, String> createMap(String... pairs) {
        Map<String, String> result = new HashMap<>();

        for (int i = 0; i < pairs.length; i += 2) {
            result.put(pairs[i], pairs[i + 1]);
        }
        return result;
    }
}
