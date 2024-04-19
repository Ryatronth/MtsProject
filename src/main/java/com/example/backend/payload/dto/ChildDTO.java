package com.example.backend.payload.dto;

import com.example.backend.entity.user.ChildGroup;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ChildDTO {
    private String name;

    private String surname;

    private String patronymic;

    private String imageUrl;

    private ChildGroup group;
}
