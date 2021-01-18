import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Participante, ParticipanteLogin } from '../model/participante.model';

@Injectable({ providedIn: 'root' })
export class ParticipanteService {

  constructor(private http: HttpClient) { }

  salvarParticipante(participante: Participante) {
    return this.http.post('http://localhost:8080/participantes/', participante);
  }

  editarParticipante(participante: Participante) {
    return this.http.put('http://localhost:8080/participantes/', participante);
  }

  getParticipante(participanteLogin: ParticipanteLogin) {
    return this.http.post('http://localhost:8080/participantes/login', participanteLogin);
  }

}
