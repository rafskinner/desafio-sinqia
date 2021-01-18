import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { ErrorDialogComponent } from '../dialog/error-dialog.component';
import { Participante, ParticipanteLogin } from '../model/participante.model';
import { ParticipanteService } from '../service/participante.service';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.css']
})
export class EdicaoComponent implements OnInit, AfterViewInit {

  @ViewChild('cadastro', { static: true }) cadastro: CadastroComponent;

  loginForm: FormGroup;
  hide = true;
  participante: Participante;

  constructor(private participanteService: ParticipanteService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loginForm = new FormGroup(
      {
        'cpf': new FormControl('', [Validators.required, Validators.minLength(11), Validators.pattern('^([0-9])*$')]),
        'senha': new FormControl('', Validators.required)
      }
    );
  }

  ngAfterViewInit() {
    if (this.participante) {
      this.cadastro.cadastroForm.setValue(this.participante);
    }
  }

  onSubmit(formDirective: FormGroupDirective) {
    this.participante = null;
    const participanteLogin = new ParticipanteLogin(this.loginForm.value.cpf, this.loginForm.value.senha);

    this.participanteService.getParticipante(participanteLogin).subscribe((participante: Participante) => {
      participante.dataNascimento = new Date(participante.dataNascimento);
      participante.senha = this.loginForm.get('senha').value;
      this.participante = participante;

      this.cadastro.cadastroForm.setValue(this.participante);
      formDirective.resetForm();
    }, (err) => {
      this.openDialog(err.error.mensagem);
    });
  }

  onCancel(): void {
    this.loginForm.reset();
  }

  getErrorMessage(campo: string): string {
    if (this.loginForm.get(campo).hasError('pattern')) {
      return campo.toUpperCase() + ' deve conter apenas dígitos';
    }
    if (this.loginForm.get(campo).hasError('minlength')) {
      return campo.toUpperCase() + ' deve conter 11 dígitos';
    }
    return `Campo ${campo} é obrigatório`;
  }

  openDialog(mensagem: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '320px',
      data: { mensagem }
    });
  }

  encerrarEdicao(): void {
    this.participante = null;
  }
}
