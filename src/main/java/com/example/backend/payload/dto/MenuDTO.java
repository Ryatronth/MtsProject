package com.example.backend.payload.dto;

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
    private LocalDate startDate;
    private LocalDate endDate;
    private Set<Long> dishes;
}
