package com.example.backend.entity.dish.menu;

import com.example.backend.entity.dish.order.OrderDetails;
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
    @ManyToOne
    @JoinColumn(name = "order_details_id")
    private OrderDetails orderDetails;

    @JsonIgnore
    @OneToMany(mappedBy = "currentMenu", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    private Set<MenuDish> dishes;
}
