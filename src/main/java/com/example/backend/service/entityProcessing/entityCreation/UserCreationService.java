package com.example.backend.service.entityProcessing.entityCreation;

import com.example.backend.entity.user.Child;
import com.example.backend.entity.user.ChildGroup;
import com.example.backend.entity.user.Parent;
import com.example.backend.entity.user.User;
import com.example.backend.entity.user.repository.ChildRepository;
import com.example.backend.entity.user.repository.GroupRepository;
import com.example.backend.entity.user.repository.ParentRepository;
import com.example.backend.entity.user.repository.UserRepository;
import com.example.backend.payload.dto.ChildDTO;
import com.example.backend.payload.dto.CreationParentDTO;
import com.example.backend.payload.dto.GroupDTO;
import com.example.backend.payload.dto.UserDTO;
import com.example.backend.payload.response.CreationResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
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
                condition -> userRepository.findByUsername(data.getUsername()).isPresent());
    }

    public CreationResponse createGroup(GroupDTO data) {
        return entityBuilder.createEntity(data, groupRepository,
                dto -> ChildGroup.builder()
                        .id(data.getGroupId())
                        .build(),
                condition -> groupRepository.findById(data.getGroupId()).isPresent());
    }

    public CreationResponse createChild(ChildDTO data) {
        return entityBuilder.createEntity(data, childRepository,
                dto -> Child.builder()
                        .name(data.getName())
                        .surname(data.getSurname())
                        .patronymic(data.getPatronymic())
                        .childGroup(groupRepository.findById(data.getGroupId()).orElse(null))
                        .imageUrl(data.getImageUrl())
                        .parent(parentRepository.findById(data.getParentId()).orElse(null))
                        .build(),
                condition -> false);
    }

    @Transactional
    public CreationResponse createParent(CreationParentDTO creationParentDTO) {
        CreationResponse userResponse = createUser(creationParentDTO.getUser());

        if (userResponse.getStatus() == ResponseStatus.ERROR) {
            return userResponse;
        }

        User user = (User) userResponse.getObject();

        Set<Child> children = new HashSet<>();
        for (Long id : creationParentDTO.getParent().getChildrenId()) {
            children.add(childRepository.findById(id).orElse(null));
        }

        CreationResponse parentResponse = entityBuilder.createEntity(creationParentDTO.getParent(), parentRepository,
                dto -> Parent.builder()
                        .user(user)
                        .children(children)
                        .build(),
                condition -> false);

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
    }
}
