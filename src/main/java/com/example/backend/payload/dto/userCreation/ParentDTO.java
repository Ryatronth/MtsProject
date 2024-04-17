package com.example.backend.payload.dto.userCreation;

import com.example.backend.entity.user.Child;
import lombok.Data;

import java.util.Set;

@Data
public class ParentDTO {
    private Set<Child> children;
}
