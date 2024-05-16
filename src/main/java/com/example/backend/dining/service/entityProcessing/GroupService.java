package com.example.backend.dining.service.entityProcessing;

import com.example.backend.dining.entity.user.ChildGroup;
import com.example.backend.dining.entity.user.repository.GroupRepository;
import com.example.backend.dining.payload.dto.GroupDTO;
import com.example.backend.dining.payload.response.CreationResponse;
import com.example.backend.dining.payload.response.DeleteResponse;
import com.example.backend.dining.payload.response.ModificationResponse;
import com.example.backend.dining.service.util.*;
import com.example.backend.totalPayload.enums.ResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class GroupService implements EntityCreator<ChildGroup, GroupDTO>, EntityFilter<ChildGroup>, EntityModifier<String, GroupDTO>, EntityEraser<String> {
    private final GroupRepository groupRepository;

    @Override
    public CreationResponse<ChildGroup> create(GroupDTO data) {
        return EntityBuilder.createEntity(data, groupRepository,
                dto -> ChildGroup.builder()
                        .id(data.getGroupId())
                        .build(),
                condition -> groupRepository.findById(data.getGroupId()).isPresent(),
                "Группа успешно создана",
                "Данная группа уже существует");
    }

    @Override
    public List<ChildGroup> filtrate(Object... values) {
        return groupRepository.findAll(FilterProcessor.createSpec((key, value, root, builder) -> builder.equal(root.get(key), value), values));
    }

    @Override
    public ModificationResponse modify(String string, GroupDTO data) {
        return null;
    }

    @Override
    public DeleteResponse delete(String id) {
        groupRepository.deleteById(id);
        return DeleteResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Группа удалена")
                .build();
    }
}
