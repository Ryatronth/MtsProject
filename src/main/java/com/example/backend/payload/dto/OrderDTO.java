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
public class OrderDTO {
    private Long childId;
    private LocalDate date;
    private Set<Long> menuDishes;
}
