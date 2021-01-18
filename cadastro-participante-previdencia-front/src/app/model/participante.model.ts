import { Endereco } from './endereco.model';

export class Participante {
  public cpf: string;
  public dataNascimento: string | Date;
  public email: string;
  public nomeCompleto: string;
  public senha: string;
  public telefone: string;
  public enderecoCompleto: Endereco;

  constructor() { }
}

export class ParticipanteLogin {
  public cpf: string;
  public senha: string;

  constructor(cpf: string, senha: string) {
    this.cpf = cpf;
    this.senha = senha;
  }
}
