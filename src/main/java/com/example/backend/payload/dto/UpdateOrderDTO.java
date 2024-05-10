package com.example.backend.payload.dto;

import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UpdateOrderDTO {
    private Set<Long> toAdd;
    private Set<Long> toDelete;
}
