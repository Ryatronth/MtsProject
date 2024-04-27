package com.example.backend.service.entityProcessing.entityGetting;

import com.example.backend.entity.menu.Dish;
import com.example.backend.entity.user.Child;
import com.example.backend.entity.user.ChildGroup;
import com.example.backend.entity.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetEntityService {
    private final EntityFilter entityFilter;

    public List<User> getParents(String... pairs) {
        return entityFilter.filtrate(User.class, pairs);
    }

    public List<Child> getChild(String... pairs) {
        return entityFilter.filtrate(Child.class, pairs);
    }

    public List<ChildGroup> getGroups(String... pairs) {
        return entityFilter.filtrate(ChildGroup.class, pairs);
    }

    public List<Dish> getDishes(String... pairs) {
        List<Dish> dishes = entityFilter.filtrate(Dish.class, pairs);
        dishes.forEach(o -> o.setImageUrl("http://localhost:8080" + o.getImageUrl().substring(2).replace("\\", "/")));
        return dishes;
    }
}
