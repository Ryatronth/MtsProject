package com.example.backend.dining.service.entityProcessing.entityModification;

import com.example.backend.dining.controller.exception.customException.ModificationException;
import com.example.backend.dining.entity.user.Parent;
import com.example.backend.dining.entity.user.User;
import com.example.backend.dining.entity.user.repository.ChildRepository;
import com.example.backend.dining.entity.user.repository.ParentRepository;
import com.example.backend.dining.entity.user.repository.UserRepository;
import com.example.backend.dining.payload.dto.ParentDTO;
import com.example.backend.dining.payload.response.ModificationResponse;
import com.example.backend.totalPayload.enums.ResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

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

            if (newData.getChildren() != null) {
                childRepository.deleteParent(parent);
                childRepository.updateParent(parent, newData.getChildren());
            }

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
}
