package com.example.backend.payload.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChildDTO {
    private String name;

    private String surname;

    private String patronymic;

    private String imageUrl;

    private String groupId;
}
