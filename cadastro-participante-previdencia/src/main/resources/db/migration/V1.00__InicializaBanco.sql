create table participante(
                             cpf varchar(11) not null,
                             data_nascimento date,
                             email varchar(255) not null,
                             bairro varchar(255) not null,
                             cep varchar(8) not null,
                             complemento varchar(255),
                             ddd varchar(2),
                             gia varchar(255),
                             ibge varchar(255),
                             localidade varchar(255) not null,
                             logradouro varchar(255) not null,
                             siafi varchar(255),
                             uf varchar(2) not null,
                             nome_completo varchar(255) not null,
                             senha varchar(255) not null,
                             telefone varchar(11) not null,
                             primary key (cpf)
);