package com.example.backend.service.entityProcessing.entityModification;

import com.example.backend.controller.exception.customException.ModificationException;
import com.example.backend.entity.user.Child;
import com.example.backend.entity.user.Parent;
import com.example.backend.entity.user.User;
import com.example.backend.entity.user.repository.ChildRepository;
import com.example.backend.entity.user.repository.ParentRepository;
import com.example.backend.entity.user.repository.UserRepository;
import com.example.backend.payload.dto.ParentDTO;
import com.example.backend.payload.response.ModificationResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ParentModifier {
    private final ParentRepository parentRepository;
    private final UserRepository userRepository;
    private final ChildRepository childRepository;

    private final PasswordEncoder passwordEncoder;

    public ModificationResponse modify(Long id, ParentDTO newData) {
        try {
            Parent parent = parentRepository.findById(id).orElseThrow(() -> new ModificationException("Родитель не найден"));
            User user = parent.getUser();

            if (newData.getName() != null) {
                user.setName(newData.getName());
            }

            if (newData.getSurname() != null) {
                user.setSurname(newData.getSurname());
            }

            if (newData.getPatronymic() != null) {
                user.setPatronymic(newData.getPatronymic());
            }

            if (newData.getRole() != null) {
                user.setRole(newData.getRole());
            }

            if (newData.getPassword() != null) {
                user.setPassword(passwordEncoder.encode(newData.getPassword()));
            }

            if (newData.getPhone() != null) {
                user.setPhone(newData.getPhone());
            }

            if (!newData.getChildren().isEmpty()) {
                changeChildren(parent, newData);
            }

            userRepository.save(user);

            return ModificationResponse.builder()
                    .status(ResponseStatus.SUCCESS)
                    .message("Родитель изменен успешно")
                    .object(user)
                    .build();
        } catch (Exception ex) {
            throw new ModificationException(ex.getMessage());
        }
    }

    private void changeChildren(Parent parent, ParentDTO newData) {
        List<Child> prevChildren = childRepository.findByParentId(parent.getId());
        if (!prevChildren.isEmpty()) {
            for (Child child : prevChildren) {
                child.setParent(null);
                childRepository.save(child);
            }
        }

        for (Long childId : newData.getChildren()) {
            Child child = childRepository.findById(childId).orElseThrow(() -> new ModificationException("Ребенок не найден"));
            child.setParent(parent);
            childRepository.save(child);
        }
    }
}
