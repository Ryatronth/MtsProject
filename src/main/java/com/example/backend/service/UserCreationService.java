package com.example.backend.service;

import com.example.backend.entity.user.*;
import com.example.backend.entity.user.repository.*;
import com.example.backend.payload.dto.userCreation.*;
import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserCreationService {
    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;
    private final WorkerRepository workerRepository;
    private final ParentRepository parentRepository;
    private final ChildRepository childRepository;
    private final GroupRepository groupRepository;

    private User createUser(UserDTO data) {
        if (userRepository.findByUsername(data.getUsername()).isEmpty()) {
            User user = User.builder()
                    .username(data.getUsername())
                    .password(passwordEncoder.encode(data.getPassword()))
                    .role(data.getRole())
                    .name(data.getName())
                    .surname(data.getSurname())
                    .patronymic(data.getPatronymic())
                    .imageUrl(data.getImageUrl())
                    .phone(data.getPhone())
                    .build();

            return userRepository.save(user);
        }

        throw new IllegalArgumentException("Пользователь с таким логином уже существует.");
    }

    public ChildGroup createGroup(GroupDTO groupDTO) {
        ChildGroup childGroup = ChildGroup.builder()
                .id(groupDTO.getGroupId())
                .build();

        return groupRepository.save(childGroup);
    }

    public Child createChild(ChildDTO childDTO) {
        Child child = Child.builder()
                .name(childDTO.getName())
                .surname(childDTO.getSurname())
                .patronymic(childDTO.getPatronymic())
                .imageUrl(childDTO.getImageUrl())
                .childGroup(childDTO.getGroup())
                .build();

        return childRepository.save(child);
    }

    @Transactional
    public Worker createWorker(CreationWorkerDTO creationWorkerDTO) {
        UserDTO userDTO = creationWorkerDTO.getUser();
        WorkerDTO workerDTO = creationWorkerDTO.getWorker();

        User user = createUser(userDTO);

        Worker worker = Worker.builder()
                .user(user)
                .build();

        Worker savedWorker = workerRepository.save(worker);

        for (ChildGroup group : workerDTO.getGroups()) {
            group.setWorker(savedWorker);
            groupRepository.save(group);
        }

        return savedWorker;
    }

    @Transactional
    public Parent createParent(CreationParentDTO creationParentDTO) {
        UserDTO userDTO = creationParentDTO.getUser();
        ParentDTO parentDTO = creationParentDTO.getParent();

        User user = createUser(userDTO);

        Parent parent = Parent.builder()
                .user(user)
                .build();

        Parent savedParent = parentRepository.save(parent);

        for (Child child : parentDTO.getChildren()) {
            child.setParent(savedParent);
            childRepository.save(child);
        }

        return savedParent;
    }

    public Data getInfo(String type, long id, String groupId) {
        Data data = new Data();
        switch (type) {
            case "group" -> data.setChildGroup(groupRepository.findById(groupId).orElseThrow());
            case "child" -> data.setChild(childRepository.findById(id).orElseThrow());
            case "worker" -> data.setWorker(workerRepository.findById(id).orElseThrow());
            case "parent" -> data.setParent(parentRepository.findById(id).orElseThrow());
        }
        return data;
    }

    @Setter
    @Getter
    public static class Data {
        ChildGroup childGroup;
        Child child;
        Worker worker;
        Parent parent;
    }
}
