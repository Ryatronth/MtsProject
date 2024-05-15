package com.example.backend.dining.service.util;

import com.example.backend.dining.payload.response.CreationResponse;

public interface EntityCreator<Entity, DTO> {
    CreationResponse<Entity> create(DTO data);
}
