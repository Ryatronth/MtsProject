package com.example.backend.payload.dto;

import com.example.backend.entity.order.menu.DishType;
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

    private DishType type;

    private Double price;

    private MultipartFile image;
}
