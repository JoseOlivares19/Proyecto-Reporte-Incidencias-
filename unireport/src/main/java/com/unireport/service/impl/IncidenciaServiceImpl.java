package com.unireport.service.impl;

import com.unireport.dto.request.IncidenciaRequest;
import com.unireport.entity.Incidencia;
import com.unireport.enums.EstadoIncidencia;
import com.unireport.exception.ResourceNotFoundException;
import com.unireport.repository.AreaRepository;
import com.unireport.repository.IncidenciaRepository;
import com.unireport.repository.SedeRepository;
import com.unireport.repository.UsuarioRepository;
import com.unireport.service.IncidenciaService;
import com.unireport.service.MailService;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class IncidenciaServiceImpl implements IncidenciaService {

    private final IncidenciaRepository incidenciaRepository;
    private final SedeRepository sedeRepository;
    private final AreaRepository areaRepository;
    private final UsuarioRepository usuarioRepository;
    private final MailService mailService;

    public IncidenciaServiceImpl(IncidenciaRepository incidenciaRepository, SedeRepository sedeRepository,
                                 AreaRepository areaRepository, UsuarioRepository usuarioRepository, MailService mailService) {
        this.incidenciaRepository = incidenciaRepository;
        this.sedeRepository = sedeRepository;
        this.areaRepository = areaRepository;
        this.usuarioRepository = usuarioRepository;
        this.mailService = mailService;
    }

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
                .escalado(false)
                .sede(sedeRepository.findById(request.sedeId()).orElse(null))
                .area(areaRepository.findById(request.areaId()).orElse(null))
                .reportadoPor(usuarioRepository.findById(request.reportadoPorId()).orElse(null))
                .build();

        Incidencia guardada = incidenciaRepository.save(incidencia);

        if (guardada.getReportadoPor() != null && guardada.getReportadoPor().getEmail() != null) {
            mailService.enviarCorreo(guardada.getReportadoPor().getEmail(),
                    "Incidencia Registrada: " + guardada.getCodigo(),
                    "Su incidencia ha sido registrada correctamente.");
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
    public void escalarIncidencia(Long id) {
        Incidencia incidencia = obtenerPorId(id);
        incidencia.setEscalado(true);
        incidencia.setFechaEscalado(LocalDateTime.now());
        incidenciaRepository.save(incidencia);
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