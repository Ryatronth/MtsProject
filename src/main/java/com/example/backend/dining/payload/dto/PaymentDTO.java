package com.example.backend.dining.payload.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PaymentDTO {
    @NotNull(message = "не должно быть равно null")
    private List<Long> orders;
}
