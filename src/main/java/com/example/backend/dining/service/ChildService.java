package com.example.backend.dining.service;

import com.example.backend.dining.controller.exception.customException.ModificationException;
import com.example.backend.dining.entity.user.Child;
import com.example.backend.dining.entity.user.ChildGroup;
import com.example.backend.dining.entity.user.Parent;
import com.example.backend.dining.entity.user.repository.ChildRepository;
import com.example.backend.dining.entity.user.repository.GroupRepository;
import com.example.backend.dining.payload.dto.ChildDTO;
import com.example.backend.dining.payload.response.CreationResponse;
import com.example.backend.dining.payload.response.DeleteResponse;
import com.example.backend.dining.payload.response.ModificationResponse;
import com.example.backend.dining.service.util.*;
import com.example.backend.totalPayload.enums.ResponseStatus;
import jakarta.persistence.criteria.Join;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ChildService implements EntityCreator<Child, ChildDTO>, EntityFilter<Child>, EntityModifier<Long, ChildDTO>, EntityEraser<Long>  {
    private final ChildRepository childRepository;
    private final GroupRepository groupRepository;

    @Override
    public CreationResponse<Child> create(ChildDTO data) {
        return EntityBuilder.createEntity(data, childRepository,
                dto -> Child.builder()
                        .name(data.getName())
                        .surname(data.getSurname())
                        .patronymic(data.getPatronymic())
                        .childGroup(groupRepository.findById(data.getGroupId()).get())
                        .imageUrl(data.getImageUrl())
                        .build(),
                condition -> data.getGroupId() == null || groupRepository.findById(data.getGroupId()).isEmpty(),
                "Ребенок успешно создан",
                "Данная группа не найдена");
    }

    @Override
    public List<Child> filtrate(Object... values) {
        return childRepository.findAll(
                FilterProcessor.createSpec((key, value, root, builder) ->
                        switch (key) {
                            case "id" -> builder.equal(root.get(key), value);
                            case "childGroup" -> {
                                Join<Child, ChildGroup> childGroupJoin = root.join("childGroup");
                                yield builder.equal(childGroupJoin.get("id"), value);
                            }
                            case "parent" -> {
                                Join<Child, Parent> childParentJoin = root.join("parent");
                                yield builder.equal(childParentJoin.get("id"), value);
                            }
                            case "unlinked" -> builder.isNull(root.get("parent"));
                            default ->
                                    builder.like(builder.lower(root.get(key)), "%" + value.toString().toLowerCase() + "%");
                        }, values)
        );
    }

    @Override
    public ModificationResponse modify(Long id, ChildDTO data) {
        try {
            Child child = childRepository.findById(id).orElseThrow(() -> new ModificationException("Ребенок не найден"));

            if (data.getGroupId() != null) {
                ChildGroup group = groupRepository.findById(data.getGroupId()).orElseThrow(() -> new ModificationException("Группа не найдена"));
                child.setChildGroup(group);
            }

            if (data.getName() != null) {
                child.setName(data.getName());
            }

            if (data.getSurname() != null) {
                child.setSurname(data.getSurname());
            }

            if (data.getPatronymic() != null) {
                child.setPatronymic(data.getPatronymic());
            }

            childRepository.save(child);
            return ModificationResponse.builder()
                    .status(ResponseStatus.SUCCESS)
                    .message("Ребенок изменен успешно")
                    .object(child)
                    .build();
        } catch (Exception ex) {
            throw new ModificationException(ex.getMessage());
        }
    }

    @Override
    public DeleteResponse delete(Long id) {
        childRepository.deleteById(id);
        return DeleteResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Ребенок удален")
                .build();
    }
}
