package com.example.backend.dining.payload.dto;

import com.example.backend.dining.entity.dish.Category;
import com.example.backend.dining.validator.groups.ValidForCreate;
import com.example.backend.dining.validator.groups.ValidForUpdate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Builder
@ToString
public class DishDTO {
    @Pattern(regexp = "^(?!\\s)(?!.*\\s{2,})([а-яА-Я -«»ёЁ()]+)(?<!\\s)$", message = "должно содержать только кириллицу, пробел либо дефис", groups = {ValidForCreate.class, ValidForUpdate.class})
    @NotBlank(message = "не должно быть пустым", groups = {ValidForCreate.class})
    private String name;

    @Pattern(regexp = "^(?!\\s)(?!.*\\s{2,})([а-яА-Я -«»ёЁ()]+)(?<!\\s)$", message = "должно содержать только кириллицу, пробел либо дефис", groups = {ValidForCreate.class, ValidForUpdate.class})
    @NotBlank(message = "не должно быть пустым", groups = {ValidForCreate.class})
    private String composition;

    @NotNull(message = "не должно быть пустым", groups = {ValidForCreate.class})
    private Category category;

    @NotNull(message = "не должно быть пустым", groups = {ValidForCreate.class})
    private Double price;

    @NotNull(message = "не должно быть пустым", groups = {ValidForCreate.class})
    private MultipartFile image;
}
