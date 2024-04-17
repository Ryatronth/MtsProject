package com.example.backend.payload.dto.userCreation;

import com.example.backend.entity.user.ChildGroup;
import lombok.Data;

@Data
public class ChildDTO {
    private String name;

    private String surname;

    private String patronymic;

    private String imageUrl;

    private ChildGroup group;
}
