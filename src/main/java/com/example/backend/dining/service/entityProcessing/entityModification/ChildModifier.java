package com.example.backend.dining.service.entityProcessing.entityModification;

import com.example.backend.dining.controller.exception.customException.ModificationException;
import com.example.backend.dining.entity.user.Child;
import com.example.backend.dining.entity.user.ChildGroup;
import com.example.backend.dining.entity.user.repository.ChildRepository;
import com.example.backend.dining.entity.user.repository.GroupRepository;
import com.example.backend.dining.payload.dto.ChildDTO;
import com.example.backend.dining.payload.response.ModificationResponse;
import com.example.backend.totalPayload.enums.ResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ChildModifier {
    private final ChildRepository childRepository;
    private final GroupRepository groupRepository;

    public ModificationResponse modify(Long id, ChildDTO newData) {
        try {
            Child child = childRepository.findById(id).orElseThrow(() -> new ModificationException("Ребенок не найден"));

            if (newData.getGroupId() != null) {
                ChildGroup group = groupRepository.findById(newData.getGroupId()).orElseThrow(() -> new ModificationException("Группа не найдена"));
                child.setChildGroup(group);
            }

            if (newData.getName() != null) {
                child.setName(newData.getName());
            }

            if (newData.getSurname() != null) {
                child.setSurname(newData.getSurname());
            }

            if (newData.getPatronymic() != null) {
                child.setPatronymic(newData.getPatronymic());
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
}
