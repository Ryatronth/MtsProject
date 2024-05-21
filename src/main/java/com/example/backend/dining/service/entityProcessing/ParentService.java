package com.example.backend.dining.service.entityProcessing;

import com.example.backend.dining.controller.exception.customException.CreationException;
import com.example.backend.dining.controller.exception.customException.ModificationException;
import com.example.backend.dining.entity.user.Child;
import com.example.backend.dining.entity.user.Parent;
import com.example.backend.dining.entity.user.User;
import com.example.backend.dining.entity.user.repository.ChildRepository;
import com.example.backend.dining.entity.user.repository.ParentRepository;
import com.example.backend.dining.entity.user.repository.UserRepository;
import com.example.backend.dining.payload.dto.ParentDTO;
import com.example.backend.dining.payload.dto.UserDTO;
import com.example.backend.dining.payload.response.CreationResponse;
import com.example.backend.dining.payload.response.DeleteResponse;
import com.example.backend.dining.payload.response.ModificationResponse;
import com.example.backend.dining.service.util.*;
import com.example.backend.totalPayload.enums.ResponseStatus;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class ParentService implements EntityCreator<Parent, ParentDTO>, EntityFilter<Parent>, EntityModifier<Long, ParentDTO>, EntityEraser<Long> {
    private final UserRepository userRepository;
    private final ParentRepository parentRepository;
    private final ChildRepository childRepository;

    private final PasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public CreationResponse<Parent> create(ParentDTO data) {
        Set<Child> children = getChildren(data);
        CreationResponse<User> userResponse = createUser(ParentDTO.createUserDTO(data));

        User user = userResponse.getObject();

        CreationResponse<Parent> parentResponse = EntityBuilder.createEntity(data, parentRepository,
                dto -> Parent.builder()
                        .user(user)
                        .children(children)
                        .build(),
                condition -> false,
                "Родитель успешно создан",
                "Ошибка при создании родителя");

        Parent parent = parentResponse.getObject();

        children.forEach(child -> child.setParent(parent));

        return parentResponse;
    }

    private Set<Child> getChildren(ParentDTO data) {
        if (data.getChildren() == null || data.getChildren().isEmpty()) {
            return new HashSet<>();
        }

        Set<Child> children = new HashSet<>();
        for (Long id : data.getChildren()) {
            children.add(childRepository.findById(id).orElseThrow(() -> new CreationException("Ребенок не найден")));
        }
        return children;
    }

    private CreationResponse<User> createUser(UserDTO data) {
        return EntityBuilder.createEntity(data, userRepository,
                dto -> User.builder()
                        .username(data.getUsername())
                        .password(passwordEncoder.encode(data.getPassword()))
                        .role(data.getRole())
                        .name(data.getName())
                        .surname(data.getSurname())
                        .patronymic(data.getPatronymic())
                        .imageUrl(data.getImageUrl())
                        .phone(data.getPhone())
                        .build(),
                condition -> userRepository.findByUsername(data.getUsername()).isPresent(),
                "Пользователь успешно создан",
                "Пользователь с данным username уже существует");
    }

    @Override
    public List<Parent> filtrate(Object... values) {
        return userRepository.findAll(
                FilterProcessor.createSpec((key, value, root, builder) ->
                        switch (key) {
                            case "role", "id" -> builder.equal(root.get(key), value);
                            default -> builder.like(builder.lower(root.get(key)), "%" + value.toString().toLowerCase() + "%");
                        }, values)
        ).stream().map(User::getParent).toList();
    }

    @Transactional
    @Override
    public ModificationResponse update(Long id, ParentDTO data) {
        try {
            Parent parent = parentRepository.findById(id).orElseThrow(() -> new ModificationException("Родитель не найден"));
            User user = parent.getUser();

            if (data.getChildren() != null) {
                childRepository.deleteParent(parent);
                childRepository.updateParent(parent, data.getChildren());
            }

            if (data.getName() != null) {
                user.setName(data.getName());
            }

            if (data.getSurname() != null) {
                user.setSurname(data.getSurname());
            }

            if (data.getPatronymic() != null) {
                user.setPatronymic(data.getPatronymic());
            }

            if (data.getRole() != null) {
                user.setRole(data.getRole());
            }

            if (data.getPassword() != null) {
                user.setPassword(passwordEncoder.encode(data.getPassword()));
            }

            if (data.getPhone() != null) {
                user.setPhone(data.getPhone());
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

    @Override
    public DeleteResponse delete(Long id) {
        userRepository.deleteById(id);
        return DeleteResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Пользователь удален")
                .build();
    }
}
