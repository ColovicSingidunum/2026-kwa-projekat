import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Projekat } from '../../models/Projekat';
import { Strana, VELICINE_STRANE, VelicinaStrane, razloziSort } from '../../models/Strana';
import { ProjekatService } from '../../services/projekat-service';

@Component({
  selector: 'app-projekti',
  imports: [
    DatePipe,
    ReactiveFormsModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
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
  protected upit = this.projekti.poslednjiUpit;
  protected pretraga = new FormControl(this.upit.pretraga ?? '', { nonNullable: true });
  protected sort = razloziSort(this.upit.sort);

  constructor() {
    this.ucitaj();
    this.pretraga.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((p) => {
      this.upit.pretraga = p;
      this.upit.strana = 0;
      this.ucitaj();
    });
  }

  sortiraj(s: Sort) {
    this.upit.sort = s.direction ? `${s.active},${s.direction}` : undefined;
    this.ucitaj();
  }

  promeniStranu(e: PageEvent) {
    this.upit.strana = e.pageIndex;
    this.upit.velicina = e.pageSize as VelicinaStrane;
    this.ucitaj();
  }

  private ucitaj() {
    this.ucitava.set(true);
    this.projekti
      .query(this.upit)
      .pipe(finalize(() => this.ucitava.set(false)))
      .subscribe((s) => {
        if (s.sadrzaj.length === 0 && s.broj > 0) {
          this.upit.strana = s.broj - 1;
          this.ucitaj();
          return;
        }
        this.strana.set(s);
      });
  }
}
