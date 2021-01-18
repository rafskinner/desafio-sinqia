package br.com.sinqia.resource.dto;

import br.com.sinqia.domain.model.Endereco;
import br.com.sinqia.domain.model.Participante;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ParticipanteDTO {
    private String cpf;
    private String nomeCompleto;
    private String email;
    private String telefone;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
    private LocalDate dataNascimento;
    private Endereco enderecoCompleto;

    public ParticipanteDTO(Participante participante) {
        this.cpf = participante.getCpf();
        this.nomeCompleto = participante.getNomeCompleto();
        this.email = participante.getEmail();
        this.telefone = participante.getTelefone();
        this.dataNascimento = participante.getDataNascimento();
        this.enderecoCompleto = participante.getEnderecoCompleto();
    }
}
