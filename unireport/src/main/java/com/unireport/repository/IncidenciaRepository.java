package com.unireport.repository;
import com.unireport.entity.Incidencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IncidenciaRepository extends JpaRepository<Incidencia, Long> {
    List<Incidencia> findBySedeId(Long sedeId);
    List<Incidencia> findByAreaId(Long areaId);
    @Query("SELECT i.estado, COUNT(i) FROM Incidencia i GROUP BY i.estado")
    List<Object[]> countByEstado();

    @Query("SELECT i.prioridad, COUNT(i) FROM Incidencia i GROUP BY i.prioridad")
    List<Object[]> countByPrioridad();
}