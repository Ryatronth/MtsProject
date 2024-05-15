package com.example.backend.dining.service.util;

import com.example.backend.dining.payload.response.ModificationResponse;

public interface EntityModifier<ID, UpdateDTO> {
    ModificationResponse modify(ID id, UpdateDTO data);
}
