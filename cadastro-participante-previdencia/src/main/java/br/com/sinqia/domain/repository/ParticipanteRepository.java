package br.com.sinqia.domain.repository;

import br.com.sinqia.domain.model.Participante;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipanteRepository extends JpaRepository<Participante, String> {
}
