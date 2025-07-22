package com.canisoft.demo.modelo;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarritoItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int cantidad;

    @ManyToOne
    private Producto producto;

    @ManyToOne
    @JoinColumn(name = "carrito_id")
    @JsonIgnore // 👈 Importante que sea de com.fasterxml.jackson.annotation
    private Carrito carrito;
}
