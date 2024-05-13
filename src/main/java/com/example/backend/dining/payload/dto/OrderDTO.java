package com.example.backend.dining.payload.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderDTO {
    @NotNull(message = "не должно быть равно null")
    private Long childId;

    @NotNull(message = "не должно быть равно null")
    private LocalDate date;

    @NotNull(message = "не должно быть равно null")
    private Set<Long> menuDishes;
}
