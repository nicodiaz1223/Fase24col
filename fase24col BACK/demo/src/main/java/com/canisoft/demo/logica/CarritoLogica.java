package com.canisoft.demo.logica;

import com.canisoft.demo.modelo.*;
import com.canisoft.demo.persistencia.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CarritoLogica {

    private final CarritoRepositorio carritoRepositorio;
    private final CarritoItemRepositorio carritoItemRepositorio;
    private final UsuarioRepositorio usuarioRepositorio;
    private final ProductoRepositorio productoRepositorio;

    public CarritoLogica(CarritoRepositorio carritoRepositorio,
                         CarritoItemRepositorio carritoItemRepositorio,
                         UsuarioRepositorio usuarioRepositorio,
                         ProductoRepositorio productoRepositorio) {
        this.carritoRepositorio = carritoRepositorio;
        this.carritoItemRepositorio = carritoItemRepositorio;
        this.usuarioRepositorio = usuarioRepositorio;
        this.productoRepositorio = productoRepositorio;
    }

public void agregarItem(Long idUsuario, Long idProducto, int cantidad) {
    System.out.println(">>> Buscar usuario " + idUsuario);
    Usuario usuario = usuarioRepositorio.findById(idUsuario)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

    System.out.println(">>> Buscar producto " + idProducto);
    Producto producto = productoRepositorio.findById(idProducto)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

    System.out.println(">>> Buscar carrito del usuario");
    Carrito carrito = carritoRepositorio.findByUsuario(usuario)
            .orElseGet(() -> {
                System.out.println(">>> No había carrito, creando nuevo");
                Carrito nuevoCarrito = new Carrito();
                nuevoCarrito.setUsuario(usuario);
                nuevoCarrito.setItems(new ArrayList<>());
                return carritoRepositorio.save(nuevoCarrito);
            });

    System.out.println(">>> Verificando si ya hay item con ese producto");
    Optional<CarritoItem> itemExistente = carrito.getItems().stream()
            .filter(item -> item.getProducto().getId().equals(producto.getId()))
            .findFirst();

    if (itemExistente.isPresent()) {
        CarritoItem item = itemExistente.get();
        item.setCantidad(item.getCantidad() + cantidad);
        carritoItemRepositorio.save(item);
        System.out.println(">>> Aumentó cantidad a: " + item.getCantidad());
    } else {
        CarritoItem nuevoItem = new CarritoItem();
        nuevoItem.setCarrito(carrito);
        nuevoItem.setProducto(producto);
        nuevoItem.setCantidad(cantidad);
        carritoItemRepositorio.save(nuevoItem);
        carrito.getItems().add(nuevoItem);
        carritoRepositorio.save(carrito);
        System.out.println(">>> Nuevo item agregado con cantidad: " + cantidad);
    }
}

    public List<CarritoItem> listarItems(Long idUsuario) {
        Usuario usuario = usuarioRepositorio.findById(idUsuario)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        return carritoRepositorio.findByUsuario(usuario)
                .map(Carrito::getItems)
                .orElse(new ArrayList<>());
    }

    public void eliminarItem(Long idItem) {
        carritoItemRepositorio.deleteById(idItem);
    }

    public void vaciarCarrito(Long idUsuario) {
        Usuario usuario = usuarioRepositorio.findById(idUsuario)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        Carrito carrito = carritoRepositorio.findByUsuario(usuario).orElse(null);
        if (carrito != null) {
            for (CarritoItem item : new ArrayList<>(carrito.getItems())) {
                carritoItemRepositorio.deleteById(item.getId());
            }
            carrito.getItems().clear();
            carritoRepositorio.save(carrito);
        }
    }

    public double obtenerTotal(Long idUsuario) {
        return listarItems(idUsuario).stream()
                .mapToDouble(item -> item.getProducto().getPrecio() * item.getCantidad())
                .sum();
    }

    public boolean eliminarItemDeUsuario(Long idUsuario, Long idItem) {
        Optional<CarritoItem> itemOpt = carritoItemRepositorio.findById(idItem);

        if (itemOpt.isPresent()) {
            CarritoItem item = itemOpt.get();
            Carrito carrito = item.getCarrito();

            // Validamos que el carrito sea del usuario que hace la petición
            if (carrito.getUsuario().getId().equals(idUsuario)) {
                carritoItemRepositorio.deleteById(idItem);
                return true;
            }
        }
        return false;
    }

}
