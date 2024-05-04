package com.example.backend.entity.dish.order;

import com.example.backend.entity.user.Child;
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
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private Double totalPrice;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "child_id")
    private Child child;

    @JsonIgnore
    @OneToMany(mappedBy = "order", cascade = CascadeType.REMOVE)
    private Set<OrderMenu> details;
}
