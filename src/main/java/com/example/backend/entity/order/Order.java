package com.example.backend.entity.order;

import com.example.backend.entity.user.Child;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date date;

    private Double totalPrice;

    @ManyToOne
    @JoinColumn(name = "child_id")
    private Child child;

    @OneToMany(mappedBy = "order", cascade = CascadeType.REMOVE)
    private Set<OrderDetails> details;
}
