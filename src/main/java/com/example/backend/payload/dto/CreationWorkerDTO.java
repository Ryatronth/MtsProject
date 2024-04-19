package com.example.backend.payload.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CreationWorkerDTO {
    private UserDTO user;
    private WorkerDTO worker;
}
