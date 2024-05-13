package com.example.backend.dining.payload.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GroupDTO {
    @NotBlank(message = "не должно быть пустым")
    private String groupId;
}
