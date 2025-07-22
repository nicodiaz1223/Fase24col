package com.canisoft.demo.controlador;

import com.canisoft.demo.modelo.Producto;
import com.canisoft.demo.logica.ProductoLogica;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/productos")
public class ProductoControlador {

    @Autowired
    private ProductoLogica productoLogica;

    /**
     * Ver info del Producto
     * 
     * @param 
     * @return Arreglo de todos los Productos
     */    
    @GetMapping
    public List<Producto> listarProductos() {
        return productoLogica.obtenerTodos();
    }

    /**
     * Ver info del Producto
     * 
     * @param id ID del producto
     * @return Producto con ese ID, o 404 si no existe
     */  
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerProducto(@PathVariable Long id) {
        Optional<Producto> producto = productoLogica.obtenerPorId(id);
        return producto.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    /**
     * Ver productos de la categoria
     * 
     * @param categoria 
     * @return Producto de esa categoria
     */  

    @GetMapping("/categoria/{categoria}")
    public List<Producto> productosPorCategoria(@PathVariable String categoria) {
        return productoLogica.buscarPorCategoria(categoria);
    }

    /**
     * Crear un nuevo producto
     * 
     * @param producto JSON con nombre, descripcion, precio, stock, categoria, imagenUrl
     * @return Producto registrado con ID generado
     */
    @PostMapping
    public Producto crearProducto(@RequestBody Producto producto) {
        return productoLogica.guardar(producto);
    }

    /**
     * Actualizar producto
     * 
     * @param id      ID del producto
     * @param producto Datos actualizados
     * @return prosucto actualizado
     */ 
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Long id, @RequestBody Producto productoActualizado) {
        return productoLogica.obtenerPorId(id).map(producto -> {
            producto.setNombre(productoActualizado.getNombre());
            producto.setDescripcion(productoActualizado.getDescripcion());
            producto.setPrecio(productoActualizado.getPrecio());
            producto.setStock(productoActualizado.getStock());
            producto.setCategoria(productoActualizado.getCategoria());
            producto.setImagenUrl(productoActualizado.getImagenUrl());
            return ResponseEntity.ok(productoLogica.guardar(producto));
        }).orElse(ResponseEntity.notFound().build());
    }

    /**
     * Eliminar producto por ID
     * 
     * @param id ID del producto
     */ 
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        if (productoLogica.obtenerPorId(id).isPresent()) {
            productoLogica.eliminar(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
