package br.com.sinqia.domain.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@Entity
public class Participante {
    @Column
    @CPF
    @Id
    private String cpf;

    @Column
    @NotBlank
    private String nomeCompleto;

    @Column
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    @NotNull
    private LocalDate dataNascimento;

    @Column
    @Email
    private String email;

    @Column
    @NotBlank
    private String telefone;

    @Column
    @NotBlank
    private String senha;

    @Embedded
    private Endereco enderecoCompleto;
}
