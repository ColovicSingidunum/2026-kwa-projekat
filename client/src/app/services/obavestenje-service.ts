import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ObavestenjeService {
  private snackBar = inject(MatSnackBar);

  greska(poruka: string) {
    this.snackBar.open(poruka, undefined, {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['toast', 'toast-greska'],
    });
  }
}
