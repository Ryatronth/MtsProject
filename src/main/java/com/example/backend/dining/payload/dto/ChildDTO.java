package com.example.backend.dining.payload.dto;

import com.example.backend.dining.validator.groups.ValidForCreate;
import com.example.backend.dining.validator.groups.ValidForUpdate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChildDTO {
    @Pattern(regexp = "^(?!\\s)(?!.*\\s{2,})([а-яА-Я -ёЁ]+)(?<!\\s)$", message = "должно содержать только кириллицу, пробел либо дефис", groups = {ValidForCreate.class, ValidForUpdate.class})
    @NotBlank(message = "не должно быть пустым", groups = {ValidForCreate.class})
    private String name;

    @Pattern(regexp = "^(?!\\s)(?!.*\\s{2,})([а-яА-Я -ёЁ]+)(?<!\\s)$", message = "должно содержать только кириллицу, пробел либо дефис", groups = {ValidForCreate.class, ValidForUpdate.class})
    @NotBlank(message = "не должно быть пустым", groups = {ValidForCreate.class})
    private String surname;

    @Pattern(regexp = "^(?!\\s)(?!.*\\s{2,})([а-яА-Я -ёЁ]*)(?<!\\s)$", message = "должно содержать только кириллицу, пробел либо дефис", groups = {ValidForCreate.class, ValidForUpdate.class})
    private String patronymic;

    @Null(groups = {ValidForCreate.class})
    private String imageUrl;

    @NotBlank(message = "не должно быть пустым", groups = {ValidForCreate.class})
    private String groupId;
}
