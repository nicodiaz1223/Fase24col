package com.canisoft.demo.persistencia;

import com.canisoft.demo.modelo.Carrito;
import com.canisoft.demo.modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CarritoRepositorio extends JpaRepository<Carrito, Long> {
    Optional<Carrito> findByUsuario(Usuario usuario);
}
