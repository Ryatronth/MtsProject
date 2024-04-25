package com.example.backend.service.entityProcessing.entityModification;

import com.example.backend.entity.user.repository.ChildRepository;
import com.example.backend.entity.user.repository.UserRepository;
import com.example.backend.payload.dto.ChildDTO;
import com.example.backend.payload.dto.ParentDTO;
import com.example.backend.payload.dto.UserDTO;
import com.example.backend.payload.response.ModificationResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserModificationService {
    private final UserRepository userRepository;
    private final ChildRepository childRepository;

    private final  EntityModifier entityModifier;

    public ModificationResponse updateUser(Long userId, UserDTO newData) {
        return entityModifier.modifyEntity(newData, userRepository, userId);
    }

    public ModificationResponse updateChild(Long childId, ChildDTO newData) {
        return entityModifier.modifyEntity(newData, childRepository, childId);
    }

    @Transactional
    public ModificationResponse updateParent(Long parentId, ParentDTO newData) {
        return entityModifier.modifyEntity(newData, userRepository, parentId);
    }
}
