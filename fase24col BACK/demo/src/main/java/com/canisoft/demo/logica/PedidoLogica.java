package com.canisoft.demo.logica;

import com.canisoft.demo.modelo.*;
import com.canisoft.demo.persistencia.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PedidoLogica {
    private final ProductoLogica productoLogica;
    private final PedidoRepositorio pedidoRepositorio;
    private final PedidoItemRepositorio pedidoItemRepositorio;
    private final UsuarioRepositorio usuarioRepositorio;
    private final CarritoRepositorio carritoRepositorio;
    private final CarritoItemRepositorio carritoItemRepositorio;
    private final ProductoRepositorio productoRepositorio;
    private final CarritoLogica carritoLogica;

    public PedidoLogica(PedidoRepositorio pedidoRepositorio,
                        PedidoItemRepositorio pedidoItemRepositorio,
                        UsuarioRepositorio usuarioRepositorio,
                        CarritoRepositorio carritoRepositorio,
                        CarritoItemRepositorio carritoItemRepositorio,
                        ProductoRepositorio productoRepositorio,
                        CarritoLogica carritoLogica,ProductoLogica productoLogica) {
        this.pedidoRepositorio = pedidoRepositorio;
        this.pedidoItemRepositorio = pedidoItemRepositorio;
        this.usuarioRepositorio = usuarioRepositorio;
        this.carritoRepositorio = carritoRepositorio;
        this.carritoItemRepositorio = carritoItemRepositorio;
        this.productoRepositorio = productoRepositorio;
        this.carritoLogica = carritoLogica;
        this.productoLogica = productoLogica;
    }

    public Pedido crearPedidoDesdeCarrito(Long idUsuario, String direccionEnvio, String formaPago) {
        Usuario usuario = usuarioRepositorio.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Carrito carrito = carritoRepositorio.findByUsuario(usuario)
                .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));

        if (carrito.getItems().isEmpty()) {
            throw new RuntimeException("El carrito está vacío");
        }

        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setFecha(LocalDateTime.now());
        pedido.setDireccionEnvio(direccionEnvio);
        pedido.setFormaPago(formaPago);

        List<PedidoItem> items = convertirItemsCarritoACopiaSegura(carrito, pedido);
        pedido.setItems(items);

        double total = items.stream()
                .mapToDouble(PedidoItem::getSubtotal)
                .sum();

        pedido.setTotal(total);

        pedidoRepositorio.save(pedido);
        carritoLogica.vaciarCarrito(idUsuario);

        return pedido;
    }

    private List<PedidoItem> convertirItemsCarritoACopiaSegura(Carrito carrito, Pedido pedido) {
        List<PedidoItem> itemsPedido = new ArrayList<>();

        for (CarritoItem item : carrito.getItems()) {
            Producto productoLimpio = productoRepositorio.findById(item.getProducto().getId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
            
            int cantidad = item.getCantidad();
            productoLogica.disminuirStock(productoLimpio.getId(), cantidad);

            PedidoItem pedidoItem = new PedidoItem();
            pedidoItem.setPedido(pedido);
            pedidoItem.setProducto(productoLimpio);
            pedidoItem.setCantidad(item.getCantidad());
            pedidoItem.setPrecioUnitario(productoLimpio.getPrecio());
            pedidoItem.setSubtotal(productoLimpio.getPrecio() * item.getCantidad());

            itemsPedido.add(pedidoItem);
        }

        return itemsPedido;
    }

    public Pedido obtenerPedidoPorId(Long id) {
        return pedidoRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
    }

    public List<Pedido> listarPedidosPorUsuario(Long idUsuario) {
        Usuario usuario = usuarioRepositorio.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return pedidoRepositorio.findByUsuario(usuario);
    }
}
