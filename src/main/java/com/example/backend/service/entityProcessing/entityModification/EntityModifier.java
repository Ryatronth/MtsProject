package com.example.backend.service.entityProcessing.entityModification;

import com.example.backend.controller.exception.customException.ModificationException;
import com.example.backend.entity.auth.RoleName;
import com.example.backend.entity.dish.menu.Dish;
import com.example.backend.entity.user.Child;
import com.example.backend.entity.user.ChildGroup;
import com.example.backend.entity.user.Parent;
import com.example.backend.entity.user.User;
import com.example.backend.entity.user.repository.ChildRepository;
import com.example.backend.entity.user.repository.GroupRepository;
import com.example.backend.entity.user.repository.ParentRepository;
import com.example.backend.payload.dto.DishDTO;
import com.example.backend.payload.dto.ParentDTO;
import com.example.backend.payload.response.ModificationResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.lang.reflect.Field;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class EntityModifier {
    private final ChildRepository childRepository;
    private final ParentRepository parentRepository;
    private final GroupRepository groupRepository;

    private final PasswordEncoder passwordEncoder;

    public <T, U, ID> ModificationResponse modifyEntity(U newData, JpaRepository<T, ID> repository, ID id) {
        T entity = repository.findById(id).orElseThrow(() -> new ModificationException("Сущность не найдена"));

        Field[] dtoFields = newData.getClass().getDeclaredFields();

        return changeFields(entity, newData, repository, dtoFields);
    }


    private <T, U, ID> ModificationResponse changeFields(T entity, U newData, JpaRepository<T, ID> repository, Field[] dtoFields) {
        for (Field field : dtoFields) {
            try {
                String fieldName = field.getName();

                switch (fieldName) {
                    case "children" -> changeChildren(entity, newData);
                    case "groupId" -> changeGroup(entity, newData);
                    case "image" -> changeImage(entity, newData);
                    default -> changeField(entity, fieldName, newData);
                }
            } catch (Exception ex) {
                throw new ModificationException(ex.getMessage());
            }
        }

        repository.save(entity);

        return ModificationResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Сущность успешно изменена")
                .build();
    }

    private <T> Field getField(T newData, String fieldName) throws Exception {
        Field field = newData.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        return field;
    }

    private <T, U> void changeImage(T entity, U newData) throws Exception {
        DishDTO data = (DishDTO) newData;

        MultipartFile image = data.getImage();

        if (image.isEmpty()) {
            return;
        }

        Field field = getField(entity, "imageUrl");

        File oldFile = new File((String) field.get(entity));
        oldFile.delete();

        byte[] bytes = image.getBytes();

        String UPLOAD_DIR = "../images/dish/";

        Path path = Paths.get(UPLOAD_DIR + image.getOriginalFilename());
        Files.write(path, bytes);

        ((Dish) entity).setImageUrl(path.toString());
    }

    private <T, U> void changeField(T entity, String fieldName, U newData) throws Exception {
        Field field = getField(newData, fieldName);

        Object value = field.get(newData);

        if (value != null && !value.equals("")) {
            Field entityField = entity.getClass().getDeclaredField(field.getName());
            entityField.setAccessible(true);

            if (field.getName().equals("password")) {
                value = passwordEncoder.encode((CharSequence) value);
            }

            entityField.set(entity, value);
        }
    }

    private <T, U> void changeChildren(T entity, U newData) {
        if (entity.getClass().equals(User.class) && ((User) entity).getRole().equals(RoleName.PARENT) &&
                newData.getClass().equals(ParentDTO.class)) {
            Parent parent = parentRepository.findById(((User) entity).getId())
                    .orElseThrow(() -> new ModificationException("Родитель не найден"));

            for (Child currChild : parent.getChildren()) {
                if (currChild != null) {
                    currChild.setParent(null);
                }
            }

            for (Long childId : ((ParentDTO) newData).getChildren()) {
                Child child = childRepository.findById(childId)
                        .orElseThrow(() -> new ModificationException("Ребенок не найден"));
                if (child != null) {
                    child.setParent(parent);
                    childRepository.save(child);
                }
            }
        }
    }

    private <T, U> void changeGroup(T entity, U newData) throws Exception {
        Field field = getField(newData, "groupId");
        ChildGroup group = groupRepository.findById(String.valueOf(field.get(newData)))
                .orElseThrow(() -> new ModificationException("Группа не найдена"));

        ((Child) entity).setChildGroup(group);
    }
}
