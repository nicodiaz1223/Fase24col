package com.canisoft.demo.persistencia;

import com.canisoft.demo.modelo.PedidoItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoItemRepositorio extends JpaRepository<PedidoItem, Long> {
}
