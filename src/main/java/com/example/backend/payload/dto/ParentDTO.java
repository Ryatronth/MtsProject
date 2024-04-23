package com.example.backend.payload.dto;

import com.example.backend.entity.user.Child;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParentDTO {
    private Set<Long> childrenId;
}
