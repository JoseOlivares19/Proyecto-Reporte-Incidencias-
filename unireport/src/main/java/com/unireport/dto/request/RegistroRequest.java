package com.unireport.dto.request;
import com.unireport.enums.Rol;

public record RegistroRequest(
        String nombre,
        String apellido,
        String email,
        String password,
        Rol rol
) {}