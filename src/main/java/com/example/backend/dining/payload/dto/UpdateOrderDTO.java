package com.example.backend.dining.payload.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UpdateOrderDTO {
    @NotNull(message = "не должно быть равно null")
    private Set<Long> toAdd;

    @NotNull(message = "не должно быть равно null")
    private Set<Long> toDelete;
}
