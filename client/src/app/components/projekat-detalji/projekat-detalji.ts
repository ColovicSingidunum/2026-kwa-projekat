import { Component, OnInit, inject, input, numberAttribute, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';
import { Projekat } from '../../models/Projekat';
import { StatistikaProjekta } from '../../models/Statistika';
import { ProjekatService } from '../../services/projekat-service';
import { ObavestenjeService } from '../../services/obavestenje-service';
import { PotvrdaDialog } from '../potvrda-dialog/potvrda-dialog';
import { Zadaci } from '../zadaci/zadaci';

@Component({
  selector: 'app-projekat-detalji',
  imports: [DatePipe, RouterLink, MatCardModule, MatButtonModule, MatIconModule, Zadaci],
  templateUrl: './projekat-detalji.html',
  styleUrl: './projekat-detalji.css',
})
export class ProjekatDetalji implements OnInit {
  private projekti = inject(ProjekatService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private obavesti = inject(ObavestenjeService);

  id = input.required({ transform: numberAttribute });

  protected projekat = signal<Projekat | null>(null);
  protected statistika = signal<StatistikaProjekta | null>(null);

  ngOnInit() {
    this.projekti.getById(this.id()).subscribe({
      next: (p) => this.projekat.set(p),
      error: () => this.router.navigateByUrl('/projekti'),
    });
    this.ucitajStatistiku();
  }

  ucitajStatistiku() {
    this.projekti.statistika(this.id()).subscribe((s) => this.statistika.set(s));
  }

  obrisi() {
    this.dialog
      .open(PotvrdaDialog, { data: 'Obrisati projekat i sve njegove zadatke?' })
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(() => this.projekti.delete(this.id())),
      )
      .subscribe({
        next: () => {
          this.obavesti.uspeh('Projekat je obrisan.');
          this.router.navigateByUrl('/projekti');
        },
        error: () => this.obavesti.greska('Brisanje projekta nije uspelo.'),
      });
  }
}
