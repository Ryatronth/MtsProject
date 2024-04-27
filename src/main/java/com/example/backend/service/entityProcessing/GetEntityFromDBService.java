package com.example.backend.service.entityProcessing;

import com.example.backend.entity.user.Child;
import com.example.backend.entity.user.ChildGroup;
import com.example.backend.entity.user.Parent;
import com.example.backend.entity.user.User;
import com.example.backend.entity.user.repository.ChildRepository;
import com.example.backend.entity.user.repository.GroupRepository;
import com.example.backend.entity.user.repository.ParentRepository;
import com.example.backend.entity.user.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class GetEntityFromDBService {
    private final UserRepository userRepository;
    private final ChildRepository childRepository;
    private final GroupRepository groupRepository;
    private final ParentRepository parentRepository;

    private final EntityManager entityManager;

    private Map<String, String> createMap(String... pairs) {
        Map<String, String> result = new HashMap<>();

        for (int i = 0; i < pairs.length; i += 2) {
            result.put(pairs[i], pairs[i + 1]);
        }
        return result;
    }

    private <T> List<T> filtrate(Class<T> type, JpaRepository<T, ?> repository, String... pairs) {
        if (pairs.length == 0) {
            return repository.findAll();
        }

        Map<String, String> filterValues = createMap(pairs);

        CriteriaBuilder builder = entityManager.getCriteriaBuilder();

        CriteriaQuery<T> query = builder.createQuery(type);
        Root<T> root = query.from(type);

        List<Predicate> predicates = new ArrayList<>();

        for (Map.Entry<String, String> entry : filterValues.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            if (value != null) {
                String lowerCaseValue = value.toLowerCase();
                switch (key) {
                    case "childGroup" -> {
                        ChildGroup group = groupRepository.findById(value).orElse(null);
                        if (group == null) {
                            return Collections.emptyList();
                        }
                        predicates.add(builder.equal(root.get(key), group));
                    }
                    case "parent" -> {
                        Parent parent = parentRepository.findById(Long.valueOf(value)).orElse(null);
                        if (parent == null) {
                            return Collections.emptyList();
                        }
                        predicates.add(builder.equal(root.get(key), parent));
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

    public List<User> getWorkers(String... pairs) {
        return filtrate(User.class, userRepository, pairs);
    }

    public List<User> getParents(String... pairs) {
        return filtrate(User.class, userRepository, pairs);
    }

    public List<Child> getChild(String... pairs) {
        return filtrate(Child.class, childRepository, pairs);
    }

    public List<ChildGroup> getGroups(String... pairs) {
        return filtrate(ChildGroup.class, groupRepository, pairs);
    }
}
