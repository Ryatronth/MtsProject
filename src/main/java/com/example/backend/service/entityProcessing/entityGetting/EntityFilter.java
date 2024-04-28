package com.example.backend.service.entityProcessing.entityGetting;

import com.example.backend.entity.dish.menu.repository.CurrentMenuRepository;
import com.example.backend.entity.user.repository.GroupRepository;
import com.example.backend.entity.user.repository.ParentRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class EntityFilter {
    private final GroupRepository groupRepository;
    private final ParentRepository parentRepository;
    private final CurrentMenuRepository currentMenuRepository;

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
                    case "currentMenu" -> addEntityPredicate(predicates, root, currentMenuRepository, Long.parseLong(value), key, builder);
                    case "childGroup" -> addEntityPredicate(predicates, root, groupRepository, value, key, builder);
                    case "parent" -> addEntityPredicate(predicates, root, parentRepository, tryParseLong(value), key, builder);
                    case "startDate" -> addDatePredicate(predicates, root, value, key, true, builder);
                    case "endDate" -> addDatePredicate(predicates, root, value, key, false, builder);
                    default -> predicates.add(builder.like(builder.lower(root.get(key)), "%" + lowerCaseValue + "%"));
                }
            }
        }
        query.select(root).where(predicates.toArray(new Predicate[0]));

        return entityManager.createQuery(query).getResultList();
    }

    private <T, ID> void addEntityPredicate(List<Predicate> predicates,
                                            Root<?> root,
                                            JpaRepository<T, ID> repository,
                                            ID id,
                                            String key,
                                            CriteriaBuilder builder) {
        if (id != null) {
            Optional.of(repository.findById(id))
                    .ifPresent(entity -> predicates.add(builder.equal(root.get(key), entity.orElse(null))));
        } else {
            predicates.add(builder.isNull(root.get(key)));
        }
    }

    private void addDatePredicate(List<Predicate> predicates,
                                  Root<?> root,
                                  String value,
                                  String key,
                                  boolean isStart,
                                  CriteriaBuilder builder
    ) {
        LocalDate date = LocalDate.parse(value, DateTimeFormatter.ofPattern("yyyy-M-dd"));
        if (isStart) {
            predicates.add(builder.lessThanOrEqualTo(root.get(key), date));
        } else {
            predicates.add(builder.greaterThanOrEqualTo(root.get(key), date));
        }
    }

    private Long tryParseLong(String value) {
        try {
            return Long.parseLong(value);
        } catch (Exception ex) {
            return null;
        }
    }

    private Map<String, String> createMap(String... pairs) {
        Map<String, String> result = new HashMap<>();

        for (int i = 0; i < pairs.length; i += 2) {
            result.put(pairs[i], pairs[i + 1]);
        }
        return result;
    }
}
