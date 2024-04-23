package com.example.backend.service.entityProcessing.entityModification;

import com.example.backend.entity.user.User;
import com.example.backend.entity.user.repository.ChildRepository;
import com.example.backend.entity.user.repository.GroupRepository;
import com.example.backend.entity.user.repository.ParentRepository;
import com.example.backend.entity.user.repository.UserRepository;
import com.example.backend.payload.dto.UserDTO;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserModificationService {
    private final UserRepository userRepository;
    private final ParentRepository parentRepository;
    private final ChildRepository childRepository;
    private final GroupRepository groupRepository;

    private final  EntityModifier entityModifier;

//    public User updateUser(Long userId, UserDTO newData) {
//        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
//
//        User savedUser = userRepository.save((User) entityModifier.modifyEntity(user, newData));
//        return savedUser;
//    }
}
