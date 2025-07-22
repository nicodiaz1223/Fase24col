package com.canisoft.demo.controlador;

import com.canisoft.demo.logica.PedidoLogica;
import com.canisoft.demo.modelo.Pedido;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para gestionar pedidos.
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/pedidos")
public class PedidoControlador {

    private final PedidoLogica pedidoLogica;

    public PedidoControlador(PedidoLogica pedidoLogica) {
        this.pedidoLogica = pedidoLogica;
    }

    /**
     * DTO para la creación de un pedido desde el carrito.
     */
    @Data
    public static class CrearPedidoRequest {
        private Long idUsuario;
        private String direccionEnvio;
        private String formaPago;
    }

    /**
     * Crear un nuevo pedido a partir del carrito del usuario.
     *
     * @param request Objeto con idUsuario, direccionEnvio y formaPago
     * @return Pedido creado con sus items y total
     */
    @PostMapping("/crear")
    public ResponseEntity<Pedido> crearPedidoDesdeCarrito(@RequestBody CrearPedidoRequest request) {
        Pedido pedido = pedidoLogica.crearPedidoDesdeCarrito(
                request.getIdUsuario(),
                request.getDireccionEnvio(),
                request.getFormaPago()
        );
        return ResponseEntity.ok(pedido);
    }

    /**
     * Obtener un pedido específico por su ID.
     *
     * @param id ID del pedido
     * @return Pedido correspondiente si existe, o 404 si no se encuentra
     */
    @GetMapping("/{id}")
    public ResponseEntity<Pedido> obtenerPedidoPorId(@PathVariable Long id) {
        Pedido pedido = pedidoLogica.obtenerPedidoPorId(id);
        return ResponseEntity.ok(pedido);
    }

    /**
     * Listar todos los pedidos realizados por un usuario.
     *
     * @param idUsuario ID del usuario
     * @return Lista de pedidos hechos por ese usuario
     */
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Pedido>> listarPedidosPorUsuario(@PathVariable Long idUsuario) {
        List<Pedido> pedidos = pedidoLogica.listarPedidosPorUsuario(idUsuario);
        return ResponseEntity.ok(pedidos);
    }
}
