package br.com.sinqia.service;

import br.com.sinqia.domain.model.Participante;
import br.com.sinqia.domain.repository.ParticipanteRepository;
import br.com.sinqia.resource.dto.ParticipanteDTO;
import br.com.sinqia.resource.dto.ParticipanteLoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class ParticipanteService {

    @Autowired
    ParticipanteRepository participanteRepository;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public ParticipanteDTO salvar(Participante participante) {
        if (participanteRepository.existsById(participante.getCpf())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Participante a ser cadastrado ja existe.");
        }
        participante.setSenha(passwordEncoder().encode(participante.getSenha()));
        return new ParticipanteDTO(participanteRepository.save(participante));
    }

    public ParticipanteDTO editar(Participante participante) {
        if (!participanteRepository.existsById(participante.getCpf())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Participante nao pode ter seu cpf editado");
        }
        participante.setSenha(passwordEncoder().encode(participante.getSenha()));
        return new ParticipanteDTO(participanteRepository.save(participante));
    }

    public ParticipanteDTO logar(ParticipanteLoginDTO participanteLoginDTO) {
        Optional<Participante> participante = participanteRepository.findById(participanteLoginDTO.getCpf());

        if (participante.isPresent()
                && passwordEncoder().matches(participanteLoginDTO.getSenha(), participante.get().getSenha())) {
            return new ParticipanteDTO(participante.get());
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cpf ou senha nao encontrada do participante");
    }
}
