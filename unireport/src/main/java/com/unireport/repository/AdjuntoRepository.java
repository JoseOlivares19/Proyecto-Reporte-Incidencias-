package com.unireport.repository;
import com.unireport.entity.Adjunto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdjuntoRepository extends JpaRepository<Adjunto, Long> {}