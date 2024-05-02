package com.example.backend.service.entityProcessing.entityFilter;

import com.example.backend.entity.auth.RoleName;
import com.example.backend.entity.dish.menu.Dish;
import com.example.backend.entity.dish.menu.MenuDish;
import com.example.backend.entity.dish.menu.repository.CurrentMenuRepository;
import com.example.backend.entity.dish.menu.repository.DishRepository;
import com.example.backend.entity.dish.menu.repository.MenuDishRepository;
import com.example.backend.entity.user.repository.ChildRepository;
import com.example.backend.entity.user.repository.GroupRepository;
import com.example.backend.entity.user.repository.UserRepository;
import com.example.backend.payload.dto.SearchDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EntityFilterService {
    private final UserRepository userRepository;
    private final ChildRepository childRepository;
    private final GroupRepository groupRepository;
    private final DishRepository dishRepository;
    private final CurrentMenuRepository currentMenuRepository;
    private final MenuDishRepository menuDishRepository;

    public List<?> getParents(List<SearchDTO> filters) {
        filters.add(SearchDTO.builder().key("role").value(RoleName.PARENT).operation(SearchOperation.EQUAL).build());
        return userRepository.findAll(UserSpecification.filterByCriteria(filters));
    }

    public List<?> getChildren(List<SearchDTO> filters) {
        return childRepository.findAll(ChildSpecification.filterByCriteria(filters));
    }

    public List<?> getGroups(List<SearchDTO> filters) {
        return groupRepository.findAll(GroupSpecification.filterByCriteria(filters));
    }

    public List<?> getDishes(List<SearchDTO> filters) {
        List<Dish> dishes = dishRepository.findAll(DishSpecification.filterByCriteria(filters));
        dishes.forEach(o -> o.setImageUrl("http://localhost:8080" + o.getImageUrl().substring(2).replace("\\", "/")));
        return dishes;
    }

    public List<?> getMenu(List<SearchDTO> filters) {
        return currentMenuRepository.findAll(MenuSpecification.filterByCriteria(filters));
    }

    public List<?> getMenuDish(List<SearchDTO> filters) {
        List<MenuDish> dishes = menuDishRepository.findAll(MenuDishSpecification.filterByCriteria(filters));
        dishes.forEach(o -> o.getDish().setImageUrl("http://localhost:8080" + o.getDish().getImageUrl().substring(2).replace("\\", "/")));
        return dishes;
    }
}
