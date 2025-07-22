package com.canisoft.demo.modelo;

import jakarta.persistence.*;
import lombok.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PedidoItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int cantidad;

    private double precioUnitario;

    private double subtotal;

    @ManyToOne
    private Producto producto;

@ManyToOne
@JoinColumn(name = "pedido_id")
@JsonIgnore
private Pedido pedido;


}
