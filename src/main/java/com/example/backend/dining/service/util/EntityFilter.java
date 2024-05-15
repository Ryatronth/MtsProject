package com.example.backend.dining.service.util;

import java.util.List;

public interface EntityFilter<Entity> {
    List<Entity> filtrate(Object... values);
}
