package com.unireport.dto.request;

import com.unireport.enums.Categoria;
import com.unireport.enums.Prioridad;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public record IncidenciaRequest(
        @NotBlank(message = "El título es obligatorio")
        String titulo,

        @NotBlank(message = "La descripción es obligatoria")
        String descripcion,

        String motivo,

        @NotNull(message = "La categoría es obligatoria")
        Categoria categoria,

        @NotNull(message = "La prioridad es obligatoria")
        Prioridad prioridad,

        @NotNull(message = "La sede es obligatoria")
        Long sedeId,

        @NotNull(message = "El área es obligatoria")
        Long areaId,

        @NotNull(message = "El ID del reportador es obligatorio")
        Long reportadoPorId
) {}