import { NgModule } from '@angular/core';
import { CadastroComponent } from './cadastro.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatNativeDateModule, MatSelectModule, MatSnackBarModule, MAT_DATE_LOCALE } from '@angular/material';


@NgModule({
  declarations: [
    CadastroComponent
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  exports: [
    CadastroComponent
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ]
})
export class CadastroModule { }
