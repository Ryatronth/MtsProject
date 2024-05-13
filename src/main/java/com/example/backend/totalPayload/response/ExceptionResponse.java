package com.example.backend.totalPayload.response;

import com.example.backend.totalPayload.enums.ResponseStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class ExceptionResponse {
    private ResponseStatus status;
    private String message;
}
