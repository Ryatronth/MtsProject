package com.example.backend.dining.payload.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MenuDTO {
    @NotNull(message = "введите дату начала")
    private LocalDate startDate;

    @NotNull(message = "введите дату конца")
    private LocalDate endDate;

    @Size(min = 1, message = "вы должны выбрать блюда")
    @NotNull(message = "добавьте блюда")
    private Set<Long> dishes;
}
