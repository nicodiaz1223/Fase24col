package com.canisoft.demo.persistencia;

import com.canisoft.demo.modelo.Pedido;
import com.canisoft.demo.modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoRepositorio extends JpaRepository<Pedido, Long> {
    List<Pedido> findByUsuario(Usuario usuario);
}
