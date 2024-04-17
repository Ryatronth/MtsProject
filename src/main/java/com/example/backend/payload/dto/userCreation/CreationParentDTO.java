package com.example.backend.payload.dto.userCreation;

import lombok.Data;

@Data
public class CreationParentDTO {
    private UserDTO user;
    private ParentDTO parent;
}
