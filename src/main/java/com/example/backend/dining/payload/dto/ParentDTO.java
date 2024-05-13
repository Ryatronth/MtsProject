package com.example.backend.dining.payload.dto;

import com.example.backend.dining.validator.groups.ValidForCreate;
import com.example.backend.dining.validator.groups.ValidForUpdate;
import com.example.backend.security.entity.RoleName;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ParentDTO {
    @Pattern(regexp = "[a-zA-Z0-9_!]+", message = "должно содержать только латинские буквы, цифры и знаки _ !", groups = {ValidForCreate.class, ValidForUpdate.class})
    @Size(min = 3, max = 10, message = "размер должен находиться в диапазоне от 3 до 10", groups = {ValidForCreate.class, ValidForUpdate.class})
    @NotBlank(message = "не должно быть пустым", groups = {ValidForCreate.class})
    private String username;

    @Pattern(regexp = "[a-zA-Z0-9_!]+", message = "должно содержать только латинские буквы, цифры и знаки _ !", groups = {ValidForCreate.class, ValidForUpdate.class})
    @Size(min = 6, message = "размер должен быть больше либо равен 6", groups = {ValidForCreate.class, ValidForUpdate.class})
    @NotBlank(message = "не должно быть пустым", groups = {ValidForCreate.class})
    private String password;

    @NotNull(groups = {ValidForCreate.class})
    private RoleName role;

    @Null(groups = {ValidForCreate.class})
    private String imageUrl;

    @Pattern(regexp = "^(?!\\s)(?!.*\\s{2,})([а-яА-Я -]+)(?<!\\s)$", message = "должно содержать только кириллицу, пробел либо дефис", groups = {ValidForCreate.class, ValidForUpdate.class})
    @NotBlank(message = "не должно быть пустым", groups = {ValidForCreate.class})
    private String name;

    @Pattern(regexp = "^(?!\\s)(?!.*\\s{2,})([а-яА-Я -]+)(?<!\\s)$", message = "должно содержать только кириллицу, пробел либо дефис", groups = {ValidForCreate.class, ValidForUpdate.class})
    @NotBlank(message = "не должно быть пустым", groups = {ValidForCreate.class})
    private String surname;

    @Pattern(regexp = "^(?!\\s)(?!.*\\s{2,})([а-яА-Я -]*)(?<!\\s)$", message = "должно содержать только кириллицу, пробел либо дефис", groups = {ValidForCreate.class, ValidForUpdate.class})
    private String patronymic;

    @Pattern(regexp = "\\+7[0-9]{10}", message = "должно быть в формате: +7xxxxxxxxxx", groups = {ValidForCreate.class, ValidForUpdate.class})
    @NotBlank(message = "не должно быть пустым", groups = {ValidForCreate.class})
    private String phone;

    @NotNull(message = "не должно быть пустым", groups = {ValidForCreate.class})
    private List<Long> children;

    public static UserDTO createUserDTO(ParentDTO data) {
        return UserDTO.builder()
                .username(data.getUsername())
                .password(data.getPassword())
                .role(data.getRole())
                .name(data.getName())
                .surname(data.getSurname())
                .patronymic(data.getPatronymic())
                .phone(data.getPhone())
                .build();
    }
}
