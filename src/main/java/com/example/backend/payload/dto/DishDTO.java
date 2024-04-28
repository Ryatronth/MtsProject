package com.example.backend.payload.dto;

import com.example.backend.entity.dish.Category;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Builder
public class DishDTO {
    private String name;

    private String composition;

    private Category category;

    private Double price;

    private MultipartFile image;
}
