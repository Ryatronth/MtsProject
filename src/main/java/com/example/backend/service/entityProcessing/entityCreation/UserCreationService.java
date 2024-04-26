package com.example.backend.service.entityProcessing.entityCreation;

import com.example.backend.entity.user.Child;
import com.example.backend.entity.user.ChildGroup;
import com.example.backend.entity.user.Parent;
import com.example.backend.entity.user.User;
import com.example.backend.entity.user.repository.ChildRepository;
import com.example.backend.entity.user.repository.GroupRepository;
import com.example.backend.entity.user.repository.ParentRepository;
import com.example.backend.entity.user.repository.UserRepository;
import com.example.backend.payload.dto.*;
import com.example.backend.payload.response.CreationResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserCreationService {
    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;
    private final ParentRepository parentRepository;
    private final ChildRepository childRepository;
    private final GroupRepository groupRepository;

    private final EntityBuilder entityBuilder;

    public CreationResponse createUser(UserDTO data) {
        return entityBuilder.createEntity(data, userRepository,
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
                "Данный пользователь уже существует");
    }

    public CreationResponse createGroup(GroupDTO data) {
        return entityBuilder.createEntity(data, groupRepository,
                dto -> ChildGroup.builder()
                        .id(data.getGroupId())
                        .build(),
                condition -> groupRepository.findById(data.getGroupId()).isPresent(),
                "Данная группа уже существует");
    }

    public CreationResponse createChild(ChildDTO data) {
        try {
            Parent parent = data.getParentId() == null ? null : parentRepository.findById(data.getParentId())
                    .orElseThrow(() -> new EntityNotFoundException("Данный родитель не найден"));

            ChildGroup group = data.getGroupId() == null ? null : groupRepository.findById(data.getGroupId())
                    .orElseThrow(() -> new EntityNotFoundException("Данная группа не найдена"));

            return entityBuilder.createEntity(data, childRepository,
                    dto -> Child.builder()
                            .name(data.getName())
                            .surname(data.getSurname())
                            .patronymic(data.getPatronymic())
                            .childGroup(group)
                            .imageUrl(data.getImageUrl())
                            .parent(parent)
                            .build(),
                    condition -> false,
                    null);
        } catch (Exception ex) {
            return CreationResponse.builder()
                    .status(ResponseStatus.ERROR)
                    .message(ex.getMessage())
                    .build();
        }
    }

    @Transactional
    public CreationResponse createParent(ParentDTO data) {
        try {
            CreationResponse userResponse = createUser(ParentDTO.createUserDTO(data));

            if (userResponse.getStatus() == ResponseStatus.ERROR) {
                return userResponse;
            }

            User user = (User) userResponse.getObject();

            Set<Child> children = new HashSet<>();
            if (data.getChildrenId() != null) {
                for (Long id : data.getChildrenId()) {
                    children.add(childRepository.findById(id)
                            .orElseThrow(() -> new EntityNotFoundException("Ребенок не найден")));
                }
            }

            CreationResponse parentResponse = entityBuilder.createEntity(data, parentRepository,
                    dto -> Parent.builder()
                            .user(user)
                            .children(children)
                            .build(),
                    condition -> false,
                    null);

            if (parentResponse.getStatus() == ResponseStatus.ERROR) {
                return parentResponse;
            }

            Parent parent = (Parent) parentResponse.getObject();

            for (Child child : children) {
                if (child != null) {
                    child.setParent(parent);
                }
            }

            return parentResponse;
        } catch (Exception ex) {
            return CreationResponse.builder()
                    .status(ResponseStatus.ERROR)
                    .message(ex.getMessage())
                    .build();
        }
    }
}
