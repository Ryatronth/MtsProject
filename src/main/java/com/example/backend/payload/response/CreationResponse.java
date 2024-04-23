package com.example.backend.payload.response;

import com.example.backend.payload.response.authResponse.ResponseStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CreationResponse {
    private ResponseStatus status;
    private String message;
    private Object object;
}
