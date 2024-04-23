package com.example.backend.service.entityProcessing;

import com.example.backend.entity.auth.RoleName;
import com.example.backend.entity.user.Child;
import com.example.backend.entity.user.ChildGroup;
import com.example.backend.entity.user.User;
import com.example.backend.entity.user.repository.ChildRepository;
import com.example.backend.entity.user.repository.GroupRepository;
import com.example.backend.entity.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetEntityFromDBService {
    private final UserRepository userRepository;
    private final ChildRepository childRepository;
    private final GroupRepository groupRepository;

    public List<User> getWorkers() {
        return userRepository.findAllByRole(RoleName.WORKER);
    }

    public List<User> getParents() {
        return userRepository.findAllByRole(RoleName.PARENT);
    }

    public List<Child> getChild() {
        return childRepository.findAll();
    }

    public List<ChildGroup> getGroups() {
        return groupRepository.findAll();
    }
}
