package com.canisoft.demo.persistencia;

import com.canisoft.demo.modelo.CarritoItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarritoItemRepositorio extends JpaRepository<CarritoItem, Long> {
}
