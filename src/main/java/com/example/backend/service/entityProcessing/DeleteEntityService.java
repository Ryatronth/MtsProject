package com.example.backend.service.entityProcessing;

import com.example.backend.entity.menu.repository.DishRepository;
import com.example.backend.entity.user.repository.ChildRepository;
import com.example.backend.entity.user.repository.GroupRepository;
import com.example.backend.entity.user.repository.UserRepository;
import com.example.backend.payload.response.DeleteResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteEntityService {
    private final UserRepository userRepository;
    private final ChildRepository childRepository;
    private final GroupRepository groupRepository;
    private final DishRepository dishRepository;

    public DeleteResponse deleteUser(Long userId) {
        userRepository.deleteById(userId);
        return DeleteResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Пользователь удален")
                .build();

    }

    public DeleteResponse deleteChild(Long childId) {
        childRepository.deleteById(childId);
        return DeleteResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Ребенок удален")
                .build();
    }

    public DeleteResponse deleteGroup(String groupId) {
        groupRepository.deleteById(groupId);
        return DeleteResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Группа удалена")
                .build();
    }

    public DeleteResponse deleteDish(Long dishId) {
        dishRepository.deleteById(dishId);
        return DeleteResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Группа удалена")
                .build();
    }
}
