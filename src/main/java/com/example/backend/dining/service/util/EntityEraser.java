package com.example.backend.dining.service.util;

import com.example.backend.dining.payload.response.DeleteResponse;

public interface EntityEraser<ID> {
    DeleteResponse delete(ID id);
}
