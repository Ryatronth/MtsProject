package com.example.backend.payload.dto;

import com.example.backend.service.entityProcessing.entityFilter.SearchOperation;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchDTO {
    private String key;
    private Object value;
    private SearchOperation operation;
}
