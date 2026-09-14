import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-potvrda-dialog',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Potvrda</h2>
    <mat-dialog-content>{{ poruka }}</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button matButton mat-dialog-close>Otkaži</button>
      <button matButton="filled" [mat-dialog-close]="true" cdkFocusInitial>Obriši</button>
    </mat-dialog-actions>
  `,
})
export class PotvrdaDialog {
  protected poruka = inject<string>(MAT_DIALOG_DATA);
}
