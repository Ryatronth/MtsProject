package com.example.backend.dining.payload.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PaymentInfoDTO {
    private LocalDate startDate;
    private LocalDate endDate;
    private Long childId;
}
