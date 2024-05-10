package com.example.backend.service.entityProcessing;

import com.example.backend.entity.dish.menu.CurrentMenu;
import com.example.backend.entity.dish.menu.Dish;
import com.example.backend.entity.dish.menu.repository.CurrentMenuRepository;
import com.example.backend.entity.dish.menu.repository.DishRepository;
import com.example.backend.entity.user.repository.ChildRepository;
import com.example.backend.entity.user.repository.GroupRepository;
import com.example.backend.entity.user.repository.UserRepository;
import com.example.backend.payload.dto.UpdateMenuDTO;
import com.example.backend.payload.response.DeleteResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import com.example.backend.service.entityProcessing.entityFilter.EntityFilterService;
import com.example.backend.service.entityProcessing.entityModification.EntityModificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class DeleteEntityService {
    private final UserRepository userRepository;
    private final ChildRepository childRepository;
    private final GroupRepository groupRepository;
    private final DishRepository dishRepository;
    private final CurrentMenuRepository currentMenuRepository;

    private final EntityModificationService entityModificationService;
    private final EntityFilterService entityFilterService;

    public DeleteResponse deleteUser(Long userId) {
        userRepository.deleteById(userId);
        return DeleteResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Пользователь удален")
                .build();

    }

    public DeleteResponse deleteChild(Long childId) {
        childRepository.deleteById(childId);
        return DeleteResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Ребенок удален")
                .build();
    }

    public DeleteResponse deleteGroup(String groupId) {
        groupRepository.deleteById(groupId);
        return DeleteResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Группа удалена")
                .build();
    }

    public DeleteResponse deleteDish(Long dishId) {
        Dish dish = dishRepository.findById(dishId).get();
        dish.setRemoved(true);
        dishRepository.save(dish);

        List<CurrentMenu> menus = entityFilterService.getMenu("date", LocalDate.now());
        if (!menus.isEmpty()) {
            long menuId = menus.getFirst().getId();
            List<Dish> dishes = entityFilterService.getDishes("currentMenu", menuId, "dish", dishId);
            if (!dishes.isEmpty()) {
                entityModificationService.updateMenu(menuId, UpdateMenuDTO.builder().toAdd(Set.of(dishes.getFirst().getId())).build());
            }
        }

        return DeleteResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Блюдо удалено")
                .build();
    }

//    public DeleteResponse deleteMenu(Long menuId) {
//        currentMenuRepository.deleteById(menuId);
//        return DeleteResponse.builder()
//                .status(ResponseStatus.SUCCESS)
//                .message("Группа удалена")
//                .build();
//    }
}
