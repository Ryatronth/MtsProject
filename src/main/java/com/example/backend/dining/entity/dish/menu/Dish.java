package com.example.backend.dining.entity.dish.menu;

import com.example.backend.dining.entity.dish.Category;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "dishes")
public class Dish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String composition;

    @Enumerated(EnumType.STRING)
    private Category category;

    private Double price;

    private String imageUrl;

    @JsonIgnore
    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private boolean isRemoved;

    @JsonIgnore
    @OneToMany(mappedBy = "dish", fetch = FetchType.LAZY)
    private Set<MenuDish> menuDishes;

    @JsonGetter("imageUrl")
    public String getImageUrl() {
        if (imageUrl != null) {
            return "http://localhost:8080" + imageUrl.substring(2);
        }
        return null;
    }
}
