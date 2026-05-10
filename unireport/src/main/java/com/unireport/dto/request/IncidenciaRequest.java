package com.unireport.dto.request;

import com.unireport.enums.Categoria;
import com.unireport.enums.Prioridad;

public record IncidenciaRequest(
        String titulo,
        String descripcion,
        String motivo,
        Categoria categoria,
        Prioridad prioridad,
        Long sedeId,
        Long areaId,
        Long reportadoPorId
) {}