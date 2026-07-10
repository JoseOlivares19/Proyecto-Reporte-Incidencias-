package com.unireport.service;

import com.unireport.dto.request.IncidenciaRequest;
import com.unireport.entity.Incidencia;
import java.util.List;
import java.util.Map;

public interface IncidenciaService {
    Incidencia crear(IncidenciaRequest request);
    Incidencia obtenerPorId(Long id);
    List<Incidencia> listarTodas();
    List<Incidencia> listarPorSedeYArea(Long sedeId, Long areaId);
    void escalarIncidencia(Long id);
    byte[] exportarExcel();
    byte[] exportarPdfResueltas();
    List<Incidencia> listarMisIncidencias(Long usuarioId, String estado, String fechaInicio, String fechaFin);
    void cambiarEstado(Long id, String nuevoEstado, Long usuarioAccionId, Long tecnicoId, String comentario);
    void reabrirIncidencia(Long id, Long solicitadoPorId, String motivo);
    Map<String, Object> obtenerEstadisticas();
}
