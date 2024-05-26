package com.example.backend.dining.payload.response;

import com.example.backend.dining.entity.dish.menu.Dish;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderWorkerResponse {
    @Builder.Default
    private List<ChildToWorkerDTO> details = new ArrayList<>();

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ChildToWorkerDTO {
        private Long id;
        private String name;
        private String surname;
        private String patronymic;
        private List<Dish> dishes;
    }

    public void add(ChildToWorkerDTO data) {
        details.add(data);
    }
}
