package com.unireport.service.impl;

import com.unireport.dto.request.AuthRequest;
import com.unireport.dto.request.RegistroRequest;
import com.unireport.dto.response.AuthResponse;
import com.unireport.entity.Usuario;
import com.unireport.exception.ResourceNotFoundException;
import com.unireport.repository.UsuarioRepository;
import com.unireport.service.AuthService;
import com.unireport.util.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(AuthenticationManager authenticationManager, JwtUtil jwtUtil,
                           UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );
        Usuario usuario = usuarioRepository.findByEmail(request.email())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        String token = jwtUtil.generateToken(usuario.getEmail());
        return new AuthResponse(token, usuario.getId(), usuario.getRol().name());
    }

    @Override
    public Usuario registrarTest(RegistroRequest request) {
        Usuario usuario = Usuario.builder()
                .nombre(request.nombre())
                .apellido(request.apellido())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .rol(request.rol())
                .activo(true)
                .fechaCreacion(LocalDateTime.now())
                .build();
        return usuarioRepository.save(usuario);
    }
}