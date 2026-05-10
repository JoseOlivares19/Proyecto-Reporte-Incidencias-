package com.unireport.service;

import com.unireport.dto.request.IncidenciaRequest;
import com.unireport.entity.Incidencia;
import java.util.List;

public interface IncidenciaService {
    Incidencia crear(IncidenciaRequest request);
    Incidencia obtenerPorId(Long id);
    List<Incidencia> listarTodas();
    List<Incidencia> listarPorSedeYArea(Long sedeId, Long areaId);
    void escalarIncidencia(Long id);
    byte[] exportarExcel();
}