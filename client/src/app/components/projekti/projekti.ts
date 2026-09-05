import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Projekat } from '../../models/Projekat';
import { Strana, VELICINE_STRANE, VelicinaStrane } from '../../models/Strana';
import { ProjekatService } from '../../services/projekat-service';

@Component({
  selector: 'app-projekti',
  imports: [
    DatePipe,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './projekti.html',
  styleUrl: './projekti.css',
})
export class Projekti {
  private projekti = inject(ProjekatService);

  protected readonly velicine = VELICINE_STRANE;
  protected readonly kolone = ['naziv', 'opis', 'rokRealizacije'];
  protected strana = signal<Strana<Projekat> | null>(null);
  protected ucitava = signal(false);
  private upit = { strana: 0, velicina: 5 as VelicinaStrane };

  constructor() {
    this.ucitaj();
  }

  promeniStranu(e: PageEvent) {
    this.upit = { strana: e.pageIndex, velicina: e.pageSize as VelicinaStrane };
    this.ucitaj();
  }

  private ucitaj() {
    this.ucitava.set(true);
    this.projekti
      .query(this.upit)
      .pipe(finalize(() => this.ucitava.set(false)))
      .subscribe((s) => this.strana.set(s));
  }
}
