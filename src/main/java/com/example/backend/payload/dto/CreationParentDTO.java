package com.example.backend.payload.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CreationParentDTO {
    private UserDTO user;
    private ParentDTO parent;
}
