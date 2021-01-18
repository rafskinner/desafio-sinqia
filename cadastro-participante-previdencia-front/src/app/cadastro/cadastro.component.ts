import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ErrorDialogComponent } from '../dialog/error-dialog.component';
import { Endereco } from '../model/endereco.model';
import { CepService } from '../service/cep.service';
import { ParticipanteService } from '../service/participante.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Input() modoEdicao = false;

  cadastroForm: FormGroup;
  hide = true;
  ufs: string[] = ['RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO', 'MA', 'PI', 'CE', 'RN', 'PB',
    'PE', 'AL', 'SE', 'BA', 'MG', 'ES', 'RJ', 'SP', 'PR', 'SC', 'RS', 'MS', 'MT', 'GO', 'DF'];

  constructor(private participanteService: ParticipanteService,
    private cepService: CepService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.ufs.sort();
    this.cadastroForm = new FormGroup(
      {
        'cpf': new FormControl({ value: '', disabled: this.modoEdicao }, [Validators.required, Validators.minLength(11), Validators.pattern('^([0-9])*$')]),
        'senha': new FormControl('', Validators.required),
        'dataNascimento': new FormControl('', Validators.required),
        'nomeCompleto': new FormControl('', Validators.required),
        'telefone': new FormControl('', [Validators.required, Validators.pattern('^([0-9])*$')]),
        'email': new FormControl('', [Validators.required, Validators.email]),
        'enderecoCompleto': new FormGroup({
          'bairro': new FormControl('', Validators.required),
          'cep': new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^([0-9])*$')]),
          'complemento': new FormControl('', Validators.required),
          'localidade': new FormControl('', Validators.required),
          'logradouro': new FormControl('', Validators.required),
          'uf': new FormControl('', Validators.required),
          'ddd': new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^([0-9])*$')]),
          'numero': new FormControl(''),
          'gia': new FormControl(''),
          'ibge': new FormControl(''),
          'siafi': new FormControl(''),
        })
      }
    );
  }

  onSubmit(formDirective: FormGroupDirective) {
    const date = this.cadastroForm.get('dataNascimento').value;
    this.cadastroForm.get('dataNascimento').setValue(date.toLocaleDateString());

    if (!this.modoEdicao) {
      this.participanteService.salvarParticipante(this.cadastroForm.value).subscribe(() => {
        this.openSnack('Participante cadastrado com sucesso!');
        formDirective.resetForm();
      }, (err) => {
        this.openDialog(err.error.mensagem);
      });
    } else {
      this.cadastroForm.get('cpf').enable();
      this.participanteService.editarParticipante(this.cadastroForm.value).subscribe(() => {
        this.openSnack('Participante editado com sucesso!');
        this.cadastroForm.get('cpf').disable();
        this.cadastroForm.get('dataNascimento').setValue(date);
      }, (err) => {
        this.openDialog(err.error.mensagem);
      });
    }

  }

  onLimpar(): void {
    if (this.modoEdicao) {
      const cpf = this.cadastroForm.get('cpf').value;
      this.cadastroForm.reset();
      this.cadastroForm.get('cpf').setValue(cpf);
    } else {
      this.cadastroForm.reset();
    }
  }

  getErrorMessage(campo: string): string {
    let nomeCampoComErro = campo.toUpperCase();
    if (campo.match('enderecoCompleto') !== null) {
      nomeCampoComErro = campo.toUpperCase().substring(campo.indexOf('.') + 1);
    }

    if (this.cadastroForm.get(campo).hasError('email')) {
      return nomeCampoComErro + ' está incorreto';
    }
    if (this.cadastroForm.get(campo).hasError('pattern')) {
      return nomeCampoComErro + ' deve conter apenas dígitos';
    }
    if (this.cadastroForm.get(campo).hasError('minlength')) {
      return `${nomeCampoComErro} deve conter ${this.cadastroForm.get(campo).errors.minlength.requiredLength} dígitos`
    }
    return 'Campo é obrigatório';
  }

  openSnack(mensagem: string): void {
    this.snackBar.open(mensagem, 'Ok', {
      duration: 5000,
    });
  }

  openDialog(mensagem: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '320px',
      data: { mensagem }
    });
  }

  onBuscarCep(cep: string) {
    const mensagemErro = 'Erro ao tentar obter o CEP. Verifique se o mesmo está correto. Ou existe';
    this.cepService.getEnderecoPorCep(cep).subscribe((endereco: Endereco) => {
      if (!(endereco instanceof Endereco)) {
        this.openDialog(mensagemErro);
      } else {
        endereco.cep = endereco.cep.replace('-', '');
        endereco.numero = '';
        this.cadastroForm.get('enderecoCompleto').setValue(endereco);
      }

    }, () => {
      this.openDialog(mensagemErro);
    });
  }
}
