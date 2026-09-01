import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ObavestenjeService {
  private snackBar = inject(MatSnackBar);

  uspeh(poruka: string) {
    this.prikazi(poruka, ['toast']);
  }

  greska(poruka: string) {
    this.prikazi(poruka, ['toast', 'toast-greska']);
  }

  private prikazi(poruka: string, panelClass: string[]) {
    this.snackBar.open(poruka, undefined, {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass,
    });
  }
}
