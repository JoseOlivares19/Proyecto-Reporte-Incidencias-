package com.unireport.scheduler;

import com.unireport.entity.Incidencia;
import com.unireport.enums.EstadoIncidencia;
import com.unireport.repository.IncidenciaRepository;
import com.unireport.service.MailService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class TareasProgramadas {

    private final IncidenciaRepository incidenciaRepository;
    private final MailService mailService;

    public TareasProgramadas(IncidenciaRepository incidenciaRepository, MailService mailService) {
        this.incidenciaRepository = incidenciaRepository;
        this.mailService = mailService;
    }

    @Scheduled(fixedRate = 3600000)
    public void controlarTiemposMaximos() {
        List<Incidencia> pendientes = incidenciaRepository.findAll().stream()
                .filter(i -> i.getEstado() != EstadoIncidencia.CERRADO && i.getEstado() != EstadoIncidencia.RESUELTO)
                .collect(Collectors.toList());

        for (Incidencia incidencia : pendientes) {
            if (incidencia.getFechaLimiteAtencion() != null &&
                    LocalDateTime.now().isAfter(incidencia.getFechaLimiteAtencion()) &&
                    !incidencia.getEscalado()) {

                incidencia.setEscalado(true);
                incidencia.setFechaEscalado(LocalDateTime.now());
                incidenciaRepository.save(incidencia);

                mailService.enviarCorreo("unireport.pruebas@gmail.com",
                        "Alerta de Incidencia Atrasada: " + incidencia.getCodigo(),
                        "La incidencia superó la fecha límite de atención y ha sido escalada automáticamente.");
            }
        }
    }
}