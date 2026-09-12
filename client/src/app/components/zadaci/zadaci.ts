import { Component, OnInit, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { filter, finalize, switchMap } from 'rxjs';
import { PRIORITET_LABELE, STATUS_LABELE, Zadatak } from '../../models/Zadatak';
import { Strana, VELICINE_STRANE, VelicinaStrane } from '../../models/Strana';
import { ZadatakService } from '../../services/zadatak-service';
import { ObavestenjeService } from '../../services/obavestenje-service';
import { PotvrdaDialog } from '../potvrda-dialog/potvrda-dialog';

@Component({
  selector: 'app-zadaci',
  imports: [
    RouterLink,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './zadaci.html',
  styleUrl: './zadaci.css',
})
export class Zadaci implements OnInit {
  private zadaci = inject(ZadatakService);
  private dialog = inject(MatDialog);
  private obavesti = inject(ObavestenjeService);

  projekatId = input.required<number>();

  protected readonly velicine = VELICINE_STRANE;
  protected readonly kolone = ['opis', 'status', 'prioritet', 'akcije'];
  protected readonly statusi = Object.entries(STATUS_LABELE).map(
    ([v, l]) => [Number(v), l] as const,
  );
  protected readonly prioriteti = Object.entries(PRIORITET_LABELE).map(
    ([v, l]) => [Number(v), l] as const,
  );
  protected readonly statusLabele: Record<number, string> = STATUS_LABELE;
  protected readonly prioritetLabele: Record<number, string> = PRIORITET_LABELE;

  protected strana = signal<Strana<Zadatak> | null>(null);
  protected ucitava = signal(false);
  protected upit = this.zadaci.poslednjiUpit;

  ngOnInit() {
    if (this.upit.projekatId !== this.projekatId()) {
      Object.assign(this.upit, {
        projekatId: this.projekatId(),
        strana: 0,
        status: '',
        prioritet: '',
      });
      delete this.upit.sort;
    }
    this.ucitaj();
  }

  filtriraj() {
    this.upit.strana = 0;
    this.ucitaj();
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

  obrisi(zadatak: Zadatak) {
    this.dialog
      .open(PotvrdaDialog, { data: 'Obrisati zadatak?' })
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(() => this.zadaci.delete(zadatak.id)),
      )
      .subscribe({
        next: () => {
          this.obavesti.uspeh('Zadatak je obrisan.');
          this.ucitaj();
        },
        error: () => this.obavesti.greska('Brisanje zadatka nije uspelo.'),
      });
  }

  private ucitaj() {
    this.ucitava.set(true);
    this.zadaci
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
