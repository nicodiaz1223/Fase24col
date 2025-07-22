package com.canisoft.demo.controlador;

import com.canisoft.demo.logica.CarritoLogica;
import com.canisoft.demo.modelo.CarritoItem;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/carrito")
public class CarritoControlador {

    private final CarritoLogica carritoLogica;

    public CarritoControlador(CarritoLogica carritoLogica) {
        this.carritoLogica = carritoLogica;
    }

    @Data
    public static class AgregarItemRequest {
        private Long idUsuario;
        private Long idProducto;
        private int cantidad;
    }

    @PostMapping("/agregar")
    public ResponseEntity<String> agregarItem(@RequestBody AgregarItemRequest request) {
        carritoLogica.agregarItem(request.getIdUsuario(), request.getIdProducto(), request.getCantidad());
        return ResponseEntity.ok("Producto agregado");
    }

    @GetMapping("/{idUsuario}")
    public ResponseEntity<List<CarritoItem>> listarItems(@PathVariable Long idUsuario) {
        List<CarritoItem> items = carritoLogica.listarItems(idUsuario);
        return ResponseEntity.ok(items);
    }

    @DeleteMapping("/vaciar/{idUsuario}")
    public ResponseEntity<Void> vaciarCarrito(@PathVariable Long idUsuario) {
        carritoLogica.vaciarCarrito(idUsuario);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/total/{idUsuario}")
    public ResponseEntity<Double> obtenerTotal(@PathVariable Long idUsuario) {
        double total = carritoLogica.obtenerTotal(idUsuario);
        return ResponseEntity.ok(total);
    }

    // elimina solo si el ítem pertenece al carrito del usuario
    @DeleteMapping("/{idUsuario}/item/{idItem}")
    public ResponseEntity<String> eliminarItemDeUsuario(@PathVariable Long idUsuario, @PathVariable Long idItem) {
        System.out.println(">>>>> Entró al método eliminarItemDeUsuario");
        boolean eliminado = carritoLogica.eliminarItemDeUsuario(idUsuario, idItem);
        if (eliminado) {
            return ResponseEntity.ok("Ítem eliminado");
        } else {
            return ResponseEntity.status(403).body("No se puede eliminar este ítem");
        }
    }
}
