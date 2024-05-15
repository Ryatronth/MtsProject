package com.example.backend.dining.payload.response;

import com.example.backend.totalPayload.enums.ResponseStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CreationResponse<T> {
    private ResponseStatus status;
    private String message;
    private T object;
}
