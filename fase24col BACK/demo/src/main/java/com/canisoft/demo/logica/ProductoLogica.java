package com.canisoft.demo.logica;

import com.canisoft.demo.modelo.Producto;
import com.canisoft.demo.persistencia.ProductoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoLogica {

    @Autowired
    private ProductoRepositorio productoRepositorio;

    public void disminuirStock(Long idProducto, int cantidad) {
        Producto producto = productoRepositorio.findById(idProducto)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (producto.getStock() < cantidad) {
            throw new RuntimeException("Stock insuficiente para el producto: " + producto.getNombre());
        }

        producto.setStock(producto.getStock() - cantidad);
        productoRepositorio.save(producto);
    }
    public List<Producto> obtenerTodos() {
        return productoRepositorio.findAll();
    }

    public Optional<Producto> obtenerPorId(Long id) {
        return productoRepositorio.findById(id);
    }

    public Producto guardar(Producto producto) {
        return productoRepositorio.save(producto);
    }

    public void eliminar(Long id) {
        productoRepositorio.deleteById(id);
    }

    public List<Producto> buscarPorCategoria(String categoria) {
        return productoRepositorio.findByCategoria(categoria);
    }
}
