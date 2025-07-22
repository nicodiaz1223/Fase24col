package com.canisoft.demo.controlador;

import com.canisoft.demo.logica.UsuarioLogica;
import com.canisoft.demo.modelo.Usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioControlador {

    @Autowired
    private UsuarioLogica logica;

    /**
     * Registrar un nuevo usuario
     * 
     * @param usuario JSON con nombre, correo, contraseña, dirección y rol
     * @return Usuario registrado con ID generado
     */
    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody Usuario usuario) {
        try {
            Usuario nuevoUsuario = logica.registrarUsuario(usuario);
            return ResponseEntity.ok(nuevoUsuario);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al registrar el usuario.");
        }
    }

    /**
     * Iniciar sesión
     * 
     * @param credenciales JSON con correo y contraseña
     * @return Usuario si las credenciales son correctas, o 401 si no
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario credenciales) {
        Optional<Usuario> usuario = logica.iniciarSesion(
                credenciales.getCorreo(),
                credenciales.getContrasena());
        return usuario.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(401).body("Credenciales inválidas."));
    }
    
    //Logout
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Sesión cerrada correctamente.");
    }

    /**
     * Ver perfil de usuario
     * 
     * @param id ID del usuario
     * @return Usuario con ese ID, o 404 si no existe
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> verPerfil(@PathVariable Long id) {
        Optional<Usuario> usuario = logica.obtenerPerfil(id);
        return usuario.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Actualizar perfil
     * 
     * @param id      ID del usuario
     * @param usuario Datos actualizados (nombre, dirección, etc.)
     * @return Usuario actualizado
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        usuario.setId(id);
        return ResponseEntity.ok(logica.actualizarPerfil(usuario));
    }

    /**
     * Eliminar usuario por ID
     * 
     * @param id ID del usuario
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        logica.eliminarUsuario(id);
        return ResponseEntity.ok().build();
    }
}
