package com.example.backend.security.payload.response;

import com.example.backend.totalPayload.enums.ResponseStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RefreshResponse {
    private String message;
    private ResponseStatus status;
    private String accessToken;
}
