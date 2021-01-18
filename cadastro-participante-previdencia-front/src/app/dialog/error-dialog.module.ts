import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatGridListModule, MatIconModule } from '@angular/material';
import { ErrorDialogComponent } from './error-dialog.component';


@NgModule({
  declarations: [
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    MatButtonModule
  ],
  entryComponents: [ErrorDialogComponent]
})
export class ErrorDialogModule { }
