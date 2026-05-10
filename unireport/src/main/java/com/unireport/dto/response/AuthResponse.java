package com.unireport.dto.response;

public record AuthResponse(
        String token,
        Long idUsuario,
        String rol
) {}