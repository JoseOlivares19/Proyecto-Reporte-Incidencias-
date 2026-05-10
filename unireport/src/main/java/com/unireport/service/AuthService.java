package com.unireport.service;

import com.unireport.dto.request.AuthRequest;
import com.unireport.dto.request.RegistroRequest;
import com.unireport.dto.response.AuthResponse;
import com.unireport.entity.Usuario;

public interface AuthService {
    AuthResponse login(AuthRequest request);
    Usuario registrarTest(RegistroRequest request);
}