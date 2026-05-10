package com.unireport.entity;

import com.unireport.enums.EstadoIncidencia;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistorialIncidencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "incidencia_id")
    private Incidencia incidencia;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_accion_id")
    private Usuario usuarioAccion;

    @Enumerated(EnumType.STRING)
    private EstadoIncidencia estadoAnterior;

    @Enumerated(EnumType.STRING)
    private EstadoIncidencia estadoNuevo;

    @Column(columnDefinition = "TEXT")
    private String comentario;

    @Column(columnDefinition = "TEXT")
    private String solucionAplicada;

    private Integer tiempoDedicadoMinutos;
    private LocalDateTime fechaAccion;
}