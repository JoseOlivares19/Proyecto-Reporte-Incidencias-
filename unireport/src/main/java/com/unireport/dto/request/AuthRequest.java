package com.unireport.dto.request;

public record AuthRequest(
        String email,
        String password
) {}