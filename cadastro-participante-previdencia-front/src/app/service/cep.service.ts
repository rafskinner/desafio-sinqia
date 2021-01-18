import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Participante, ParticipanteLogin } from '../model/participante.model';

@Injectable({ providedIn: 'root' })
export class CepService {

  constructor(private http: HttpClient) { }

  getEnderecoPorCep(cep: string) {
    return this.http.get(`http://viacep.com.br/ws/${cep}/json/`);
  }
}
