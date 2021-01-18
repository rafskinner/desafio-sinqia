package br.com.sinqia.domain.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Embeddable
public class Endereco {
    @Column
    @NotBlank
    private String cep;

    @Column
    @NotBlank
    private String logradouro;

    @Column
    private String numero;

    @Column
    private String complemento;

    @Column
    @NotBlank
    private String bairro;

    @Column
    @NotBlank
    private String localidade;

    @Column
    @NotNull
    @Enumerated(EnumType.STRING)
    private UF uf;

    @Column
    private String ibge;

    @Column
    private String gia;

    @Column
    private String ddd;

    @Column
    private String siafi;
}
