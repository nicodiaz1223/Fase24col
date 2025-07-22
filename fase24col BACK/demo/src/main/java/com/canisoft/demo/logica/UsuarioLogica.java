package com.canisoft.demo.logica;

import com.canisoft.demo.modelo.Usuario;
import com.canisoft.demo.persistencia.UsuarioRepositorio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioLogica {

    @Autowired
    private UsuarioRepositorio repositorio;

    public Usuario registrarUsuario(Usuario usuario) {
        // Aquí podrías encriptar la contraseña si usaras seguridad
        return repositorio.save(usuario);
    }

    public Optional<Usuario> iniciarSesion(String correo, String contrasena) {
        Optional<Usuario> usuario = repositorio.findByCorreo(correo);
        if (usuario.isPresent() && usuario.get().getContrasena().equals(contrasena)) {
            return usuario;
        }
        return Optional.empty();
    }

    public Optional<Usuario> obtenerPerfil(Long id) {
        return repositorio.findById(id);
    }

    public Usuario actualizarPerfil(Usuario usuario) {
        return repositorio.save(usuario);
    }

    public void eliminarUsuario(Long id) {
        repositorio.deleteById(id);
    }
}
