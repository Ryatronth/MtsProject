package com.example.backend.service.entityProcessing.entityModification;

import com.example.backend.entity.dish.menu.repository.DishRepository;
import com.example.backend.entity.user.repository.ChildRepository;
import com.example.backend.entity.user.repository.UserRepository;
import com.example.backend.payload.dto.ChildDTO;
import com.example.backend.payload.dto.DishDTO;
import com.example.backend.payload.dto.ParentDTO;
import com.example.backend.payload.response.ModificationResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EntityModificationService {
    private final UserRepository userRepository;
    private final ChildRepository childRepository;
    private final DishRepository dishRepository;

    private final  EntityModifier entityModifier;

    public ModificationResponse updateChild(Long childId, ChildDTO newData) {
        return entityModifier.modifyEntity(newData, childRepository, childId);
    }

    @Transactional
    public ModificationResponse updateParent(Long parentId, ParentDTO newData) {
        return entityModifier.modifyEntity(newData, userRepository, parentId);
    }

    public ModificationResponse updateDish(Long dishId, DishDTO newData) {
        return entityModifier.modifyEntity(newData, dishRepository, dishId);
    }
}
