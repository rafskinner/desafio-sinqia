import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EdicaoComponent } from './edicao.component';
import { MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule } from '@angular/material';
import { CadastroModule } from '../cadastro/cadastro.module';
import { CadastroComponent } from '../cadastro/cadastro.component';


@NgModule({
  declarations: [
    EdicaoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatDialogModule,
    CadastroModule
  ]
})
export class EdicaoModule { }
