package com.example.backend.payload.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreationParentDTO {
    private UserDTO user;
    private ParentDTO parent;
}
