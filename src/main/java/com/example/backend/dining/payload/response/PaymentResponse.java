package com.example.backend.dining.payload.response;

import com.example.backend.totalPayload.enums.ResponseStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PaymentResponse {
    private ResponseStatus status;
    private String message;
}
