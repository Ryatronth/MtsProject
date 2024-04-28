package com.example.backend.payload.dto;

import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuDTO {
    private Set<Long> dishes;
}
