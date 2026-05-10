package com.unireport.controller;

import com.unireport.dto.request.IncidenciaRequest;
import com.unireport.entity.Incidencia;
import com.unireport.service.IncidenciaService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incidencias")
public class IncidenciaController {

    private final IncidenciaService incidenciaService;

    public IncidenciaController(IncidenciaService incidenciaService) {
        this.incidenciaService = incidenciaService;
    }

    @PostMapping
    public ResponseEntity<Incidencia> crear(@RequestBody IncidenciaRequest request) {
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

    @PutMapping("/{id}/escalar")
    public ResponseEntity<Void> escalar(@PathVariable Long id) {
        incidenciaService.escalarIncidencia(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/exportar")
    public ResponseEntity<byte[]> exportarExcel() {
        byte[] file = incidenciaService.exportarExcel();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=incidencias.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(file);
    }
}