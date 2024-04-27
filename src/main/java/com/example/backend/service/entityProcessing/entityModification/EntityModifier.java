package com.example.backend.service.entityProcessing.entityModification;

import com.example.backend.entity.auth.RoleName;
import com.example.backend.entity.menu.Dish;
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
import jakarta.persistence.EntityNotFoundException;
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
import java.util.HashMap;
import java.util.Map;
import java.util.function.BiConsumer;

@Service
@RequiredArgsConstructor
public class EntityModifier {
    private final ChildRepository childRepository;
    private final ParentRepository parentRepository;
    private final GroupRepository groupRepository;

    private final PasswordEncoder passwordEncoder;

    public <T, U, ID> ModificationResponse modifyEntity(U newData, JpaRepository<T, ID> repository, ID id) {
        try {
            T entity = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Сущность не найдена"));

            Field[] dtoFields = newData.getClass().getDeclaredFields();
            Class<?> entityClass = entity.getClass();

            return changeFields(entity, newData, repository, id, dtoFields, entityClass);

        } catch (EntityNotFoundException ex) {
            return ModificationResponse.builder()
                    .status(ResponseStatus.ERROR)
                    .message(ex.getMessage())
                    .build();
        }
    }


    private <T, U, ID> ModificationResponse changeFields(T entity, U newData, JpaRepository<T, ID> repository, ID id,
                                                         Field[] dtoFields, Class<?> entityClass) {
        Map<String, BiConsumer<T, U>> mappingFields = new HashMap<>();
        mappingFields.put("childrenId", (e, d) -> changeChildren(e, d, id, entityClass));
        mappingFields.put("groupId", this::changeGroup);
        mappingFields.put("parentId", this::changeParent);
        mappingFields.put("image", this::modifyImage);

        for (Field field : dtoFields) {
            try {
                mappingFields.getOrDefault(field.getName(), (e, d) -> modifyField(field, e, d)).accept(entity, newData);
            } catch (Exception ex)  {
                return ModificationResponse.builder()
                        .status(ResponseStatus.ERROR)
                        .message(ex.getMessage())
                        .build();
            }
        }

        repository.save(entity);

        return ModificationResponse.builder()
                .status(ResponseStatus.SUCCESS)
                .message("Сущность успешно изменена")
                .build();
    }

    private <T, U> void modifyImage(T entity, U newData) {
        try {
            DishDTO data = (DishDTO) newData;

            MultipartFile image = data.getImage();

            if (image.isEmpty()){
                return;
            }

            Field field = entity.getClass().getDeclaredField("imageUrl");
            field.setAccessible(true);

            File oldFile = new File((String) field.get(entity));
            oldFile.delete();

            byte[] bytes = image.getBytes();

            String UPLOAD_DIR = "../images/dish/";

            Path path = Paths.get(UPLOAD_DIR + image.getOriginalFilename());
            Files.write(path, bytes);

            ((Dish) entity).setImageUrl(path.toString());
        } catch (Exception ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }

    private <T, U> void modifyField(Field field, T entity, U newData) {
        try {
            field.setAccessible(true);
            Object value = field.get(newData);

            if (value != null && !value.equals("")) {
                Field entityField = entity.getClass().getDeclaredField(field.getName());
                entityField.setAccessible(true);

                if (field.getName().equals("password")) {
                    value = passwordEncoder.encode((CharSequence) value);
                }

                entityField.set(entity, value);
            }
        } catch (Exception ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }

    private <T, U, ID> void changeChildren(T entity, U newData, ID id, Class<?> entityClass) {
        try {
            if (entityClass.equals(User.class) && ((User) entity).getRole().equals(RoleName.PARENT) &&
                    newData.getClass().equals(ParentDTO.class) && !((ParentDTO) newData).getChildren().isEmpty()) {
                Parent parent = parentRepository.findById((Long) id)
                        .orElseThrow(() -> new Exception("Родитель не найден"));

                for (Child currChild : parent.getChildren()) {
                    if (currChild != null) {
                        currChild.setParent(null);
                    }
                }

                for (Long childId : ((ParentDTO) newData).getChildren()) {
                    Child child = childRepository.findById(childId).orElse(null);
                    if (child != null) {
                        child.setParent(parent);
                        childRepository.save(child);
                    }
                }
            }
        } catch (Exception ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }

    private <T, U> void changeGroup(T entity, U newData) {
        try {
            Field field = newData.getClass().getDeclaredField("groupId");
            field.setAccessible(true);
            ChildGroup group = groupRepository.findById(String.valueOf(field.get(newData)))
                    .orElseThrow(() -> new Exception("Группа не найдена"));

            ((Child) entity).setChildGroup(group);
        } catch (Exception ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }

    private <T, U> void changeParent(T entity, U newData) {
        try {
            Field field = newData.getClass().getDeclaredField("parentId");
            field.setAccessible(true);
            Parent parent = parentRepository.findById((Long) field.get(newData))
                    .orElseThrow(() -> new Exception("Родитель не найден"));

            ((Child) entity).setParent(parent);
        } catch (Exception ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }
}
