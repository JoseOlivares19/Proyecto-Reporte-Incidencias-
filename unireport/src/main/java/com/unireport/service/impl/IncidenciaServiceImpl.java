package com.unireport.service.impl;

import com.unireport.dto.request.IncidenciaRequest;
import com.unireport.entity.HistorialIncidencia;
import com.unireport.entity.Incidencia;
import com.unireport.entity.ReaperturaIncidencia;
import com.unireport.enums.EstadoIncidencia;
import com.unireport.enums.Prioridad;
import com.unireport.exception.ResourceNotFoundException;
import com.unireport.repository.*;
import com.unireport.service.IncidenciaService;
import com.unireport.service.MailService;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class IncidenciaServiceImpl implements IncidenciaService {

    private final IncidenciaRepository incidenciaRepository;
    private final SedeRepository sedeRepository;
    private final AreaRepository areaRepository;
    private final UsuarioRepository usuarioRepository;
    private final HistorialIncidenciaRepository historialIncidenciaRepository;
    private final ReaperturaIncidenciaRepository reaperturaIncidenciaRepository;
    private final MailService mailService;

    @Override
    public Incidencia crear(IncidenciaRequest request) {
        Incidencia incidencia = Incidencia.builder()
                .codigo(UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .titulo(request.titulo())
                .descripcion(request.descripcion())
                .motivo(request.motivo())
                .categoria(request.categoria())
                .prioridad(request.prioridad())
                .estado(EstadoIncidencia.REGISTRADO)
                .fechaCreacion(LocalDateTime.now())
                .fechaLimiteAtencion(LocalDateTime.now().plusHours(24))
                .escalado(false)
                .sede(sedeRepository.findById(request.sedeId()).orElse(null))
                .area(areaRepository.findById(request.areaId()).orElse(null))
                .reportadoPor(usuarioRepository.findById(request.reportadoPorId()).orElse(null))
                .build();

        if (incidencia.getPrioridad() == Prioridad.ALTA || incidencia.getPrioridad() == Prioridad.CRITICA) {
            incidencia.setEscalado(true);
            incidencia.setFechaEscalado(LocalDateTime.now());
        }

        Incidencia guardada = incidenciaRepository.save(incidencia);

        if (guardada.getReportadoPor() != null && guardada.getReportadoPor().getEmail() != null) {
            mailService.enviarCorreo("unireport.pruebas@gmail.com",
                    "Incidencia Registrada: " + guardada.getCodigo(),
                    "Su incidencia ha sido registrada correctamente. Usuario original: " + guardada.getReportadoPor().getEmail());
        }

        return guardada;
    }

    @Override
    public Incidencia obtenerPorId(Long id) {
        return incidenciaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Incidencia no encontrada"));
    }

    @Override
    public List<Incidencia> listarTodas() {
        return incidenciaRepository.findAll();
    }

    @Override
    public List<Incidencia> listarPorSedeYArea(Long sedeId, Long areaId) {
        List<Incidencia> incidencias = incidenciaRepository.findAll();
        if (sedeId != null) {
            incidencias = incidencias.stream().filter(i -> i.getSede() != null && i.getSede().getId().equals(sedeId)).collect(Collectors.toList());
        }
        if (areaId != null) {
            incidencias = incidencias.stream().filter(i -> i.getArea() != null && i.getArea().getId().equals(areaId)).collect(Collectors.toList());
        }
        return incidencias;
    }

    @Override
    public List<Incidencia> listarMisIncidencias(Long usuarioId, String estado, String fechaInicio, String fechaFin) {
        List<Incidencia> misIncidencias = incidenciaRepository.findAll().stream()
                .filter(i -> i.getReportadoPor() != null && i.getReportadoPor().getId().equals(usuarioId))
                .collect(Collectors.toList());

        if (estado != null && !estado.isEmpty()) {
            misIncidencias = misIncidencias.stream()
                    .filter(i -> i.getEstado().name().equalsIgnoreCase(estado))
                    .collect(Collectors.toList());
        }

        if (fechaInicio != null && fechaFin != null) {
            LocalDateTime inicio = LocalDate.parse(fechaInicio).atStartOfDay();
            LocalDateTime fin = LocalDate.parse(fechaFin).atTime(23, 59, 59);
            misIncidencias = misIncidencias.stream()
                    .filter(i -> !i.getFechaCreacion().isBefore(inicio) && !i.getFechaCreacion().isAfter(fin))
                    .collect(Collectors.toList());
        }
        return misIncidencias;
    }

    @Override
    public void cambiarEstado(Long id, String nuevoEstado, Long usuarioAccionId, Long tecnicoId, String comentario) {
        Incidencia incidencia = obtenerPorId(id);
        EstadoIncidencia estadoAnterior = incidencia.getEstado();
        EstadoIncidencia estadoNuevo = EstadoIncidencia.valueOf(nuevoEstado.toUpperCase());

        incidencia.setEstado(estadoNuevo);
        incidencia.setFechaActualizacion(LocalDateTime.now());

        if (tecnicoId != null) {
            incidencia.setAsignadoA(usuarioRepository.findById(tecnicoId).orElse(null));
        }

        incidenciaRepository.save(incidencia);

        HistorialIncidencia historial = HistorialIncidencia.builder()
                .incidencia(incidencia)
                .usuarioAccion(usuarioRepository.findById(usuarioAccionId).orElse(null))
                .estadoAnterior(estadoAnterior)
                .estadoNuevo(estadoNuevo)
                .comentario(comentario)
                .fechaAccion(LocalDateTime.now())
                .build();

        historialIncidenciaRepository.save(historial);

        if (incidencia.getReportadoPor() != null && incidencia.getReportadoPor().getEmail() != null) {
            mailService.enviarCorreo("unireport.pruebas@gmail.com",
                    "Actualización de Incidencia: " + incidencia.getCodigo(),
                    "El estado de su incidencia ha cambiado a: " + nuevoEstado + ". Usuario original: " + incidencia.getReportadoPor().getEmail());
        }
    }

    @Override
    public void reabrirIncidencia(Long id, Long solicitadoPorId, String motivo) {
        Incidencia incidencia = obtenerPorId(id);
        EstadoIncidencia estadoAnterior = incidencia.getEstado();

        incidencia.setEstado(EstadoIncidencia.REABIERTO);
        incidencia.setFechaActualizacion(LocalDateTime.now());
        incidenciaRepository.save(incidencia);

        ReaperturaIncidencia reapertura = ReaperturaIncidencia.builder()
                .incidencia(incidencia)
                .solicitadoPor(usuarioRepository.findById(solicitadoPorId).orElse(null))
                .motivo(motivo)
                .fecha(LocalDateTime.now())
                .aprobado(false)
                .build();

        reaperturaIncidenciaRepository.save(reapertura);

        HistorialIncidencia historial = HistorialIncidencia.builder()
                .incidencia(incidencia)
                .usuarioAccion(usuarioRepository.findById(solicitadoPorId).orElse(null))
                .estadoAnterior(estadoAnterior)
                .estadoNuevo(EstadoIncidencia.REABIERTO)
                .comentario("Reapertura solicitada: " + motivo)
                .fechaAccion(LocalDateTime.now())
                .build();

        historialIncidenciaRepository.save(historial);
    }

    @Override
    public void escalarIncidencia(Long id) {
        Incidencia incidencia = obtenerPorId(id);
        incidencia.setEscalado(true);
        incidencia.setFechaEscalado(LocalDateTime.now());
        incidenciaRepository.save(incidencia);
    }

    @Override
    public Map<String, Object> obtenerEstadisticas() {
        List<Incidencia> todas = incidenciaRepository.findAll();
        Map<String, Object> stats = new HashMap<>();

        stats.put("total", todas.size());

        Map<String, Long> porEstado = todas.stream()
                .collect(Collectors.groupingBy(i -> i.getEstado().name(), Collectors.counting()));
        stats.put("porEstado", porEstado);

        return stats;
    }

    @Override
    public byte[] exportarExcel() {
        List<Incidencia> incidencias = incidenciaRepository.findAll();
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Incidencias");
            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("Código");
            headerRow.createCell(1).setCellValue("Título");
            headerRow.createCell(2).setCellValue("Estado");
            headerRow.createCell(3).setCellValue("Prioridad");

            int rowIdx = 1;
            for (Incidencia incidencia : incidencias) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(incidencia.getCodigo());
                row.createCell(1).setCellValue(incidencia.getTitulo());
                row.createCell(2).setCellValue(incidencia.getEstado().name());
                row.createCell(3).setCellValue(incidencia.getPrioridad().name());
            }
            workbook.write(out);
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error al exportar Excel", e);
        }
    }
}