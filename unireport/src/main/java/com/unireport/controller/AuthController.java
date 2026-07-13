package com.unireport.controller;

import com.unireport.dto.request.AuthRequest;
import com.unireport.dto.request.RegistroRequest;
import com.unireport.dto.response.AuthResponse;
import com.unireport.entity.Usuario;
import com.unireport.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/registro-test")
    public ResponseEntity<Usuario> registroTest(@RequestBody RegistroRequest request) {
        return ResponseEntity.ok(authService.registrarTest(request));
    }
}