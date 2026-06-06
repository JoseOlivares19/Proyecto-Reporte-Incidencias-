package com.unireport.controller;

import com.unireport.dto.request.IncidenciaRequest;
import com.unireport.entity.Incidencia;
import com.unireport.service.IncidenciaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/incidencias")
@CrossOrigin(origins = "http://localhost:5173")
public class IncidenciaController {

    private final IncidenciaService incidenciaService;

    public IncidenciaController(IncidenciaService incidenciaService) {
        this.incidenciaService = incidenciaService;
    }

    @PostMapping
    public ResponseEntity<Incidencia> crear(@Valid @RequestBody IncidenciaRequest request) {
        return ResponseEntity.ok(incidenciaService.crear(request));
    }

    @GetMapping
    public ResponseEntity<List<Incidencia>> listar() {
        return ResponseEntity.ok(incidenciaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Incidencia> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(incidenciaService.obtenerPorId(id));
    }

    @GetMapping("/filtro")
    public ResponseEntity<List<Incidencia>> listarPorSedeYArea(
            @RequestParam(required = false) Long sedeId,
            @RequestParam(required = false) Long areaId) {
        return ResponseEntity.ok(incidenciaService.listarPorSedeYArea(sedeId, areaId));
    }

    @GetMapping("/mis-reportes/{usuarioId}")
    public ResponseEntity<List<Incidencia>> listarMisIncidencias(
            @PathVariable Long usuarioId,
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) String fechaInicio,
            @RequestParam(required = false) String fechaFin) {
        return ResponseEntity.ok(incidenciaService.listarMisIncidencias(usuarioId, estado, fechaInicio, fechaFin));
    }

    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SISTEMA')")
    @PutMapping("/{id}/estado")
    public ResponseEntity<Void> cambiarEstado(
            @PathVariable Long id,
            @RequestParam String nuevoEstado,
            @RequestParam Long usuarioAccionId,
            @RequestParam(required = false) Long tecnicoId,
            @RequestParam(required = false) String comentario) {
        incidenciaService.cambiarEstado(id, nuevoEstado, usuarioAccionId, tecnicoId, comentario);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAnyRole('ADMINISTRADOR', 'SISTEMA')")
    @PutMapping("/{id}/reabrir")
    public ResponseEntity<Void> reabrirIncidencia(
            @PathVariable Long id,
            @RequestParam Long solicitadoPorId,
            @RequestParam String motivo) {
        incidenciaService.reabrirIncidencia(id, solicitadoPorId, motivo);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> obtenerDashboard() {
        return ResponseEntity.ok(incidenciaService.obtenerEstadisticas());
    }

    @PreAuthorize("hasRole('SISTEMA')")
    @GetMapping("/exportar")
    public ResponseEntity<byte[]> exportarExcel() {
        byte[] file = incidenciaService.exportarExcel();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=incidencias.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(file);
    }
}