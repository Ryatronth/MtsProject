package com.example.backend.service.entityProcessing.entityModification;

import com.example.backend.payload.dto.*;
import com.example.backend.payload.response.ModificationResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EntityModificationService {
    private final ParentModifier parentModifier;
    private final ChildModifier childModifier;
    private final DishModifier dishModifier;
    private final MenuModifier menuModifier;
    private final OrderModifier orderModifier;

    @Transactional
    public ModificationResponse updateParent(Long parentId, ParentDTO newData) {
        return parentModifier.modify(parentId, newData);
    }

    public ModificationResponse updateChild(Long childId, ChildDTO newData) {
        return childModifier.modify(childId, newData);
    }

    public ModificationResponse updateDish(Long dishId, DishDTO newData) {
        return dishModifier.modify(dishId, newData);
    }

    @Transactional
    public ModificationResponse updateMenu(Long menuId, UpdateMenuDTO newData) {
        return menuModifier.modify(menuId, newData);
    }

    @Transactional
    public ModificationResponse updateOrder(Long orderId, UpdateOrderDTO newData) {
        return orderModifier.modify(orderId, newData);
    }
}
