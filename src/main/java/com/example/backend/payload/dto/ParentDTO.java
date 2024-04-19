package com.example.backend.payload.dto;

import com.example.backend.entity.user.Child;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Builder
public class ParentDTO {
    private Set<Child> children;
}
