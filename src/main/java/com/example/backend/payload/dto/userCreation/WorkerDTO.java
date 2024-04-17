package com.example.backend.payload.dto.userCreation;

import com.example.backend.entity.user.ChildGroup;
import lombok.Data;

import java.util.Set;

@Data
public class WorkerDTO {
    private Set<ChildGroup> groups;
}
