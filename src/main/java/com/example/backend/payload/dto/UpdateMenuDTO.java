package com.example.backend.payload.dto;

import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UpdateMenuDTO {
    private Set<Long> toDelete;
    private Set<Long> toAdd;
}
