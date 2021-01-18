package br.com.sinqia.resource;

import br.com.sinqia.domain.model.Participante;
import br.com.sinqia.resource.dto.ParticipanteDTO;
import br.com.sinqia.resource.dto.ParticipanteLoginDTO;
import br.com.sinqia.service.ParticipanteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping(value = "/participantes",
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE)
public class ParticipanteResource {

    @Autowired
    ParticipanteService participanteService;

    @PostMapping("/")
    @CrossOrigin
    @ResponseStatus(HttpStatus.CREATED)
    public ParticipanteDTO salvar(@RequestBody @Valid Participante participante) {
        return participanteService.salvar(participante);
    }

    @PutMapping("/")
    public ParticipanteDTO editar(@RequestBody @Valid Participante participante) {
        return participanteService.editar(participante);
    }

    @PostMapping("/login")
    public ParticipanteDTO logar(@RequestBody ParticipanteLoginDTO participanteLoginDTO) {
        return participanteService.logar(participanteLoginDTO);
    }
}
