package com.unireport.repository;
import com.unireport.entity.ReaperturaIncidencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReaperturaIncidenciaRepository extends JpaRepository<ReaperturaIncidencia, Long> {}