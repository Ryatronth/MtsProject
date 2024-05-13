package com.example.backend.dining.entity.dish.menu;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "current_menus")
public class CurrentMenu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.DATE)
    private LocalDate startDate;

    @Temporal(TemporalType.DATE)
    private LocalDate endDate;

    @JsonIgnore
    @OneToMany(mappedBy = "currentMenu", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    private Set<MenuDish> dishes;
}
