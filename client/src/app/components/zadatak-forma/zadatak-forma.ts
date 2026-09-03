import { Component, OnInit, inject, input, numberAttribute, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Prioritet, PRIORITET_LABELE, Status, STATUS_LABELE } from '../../models/Zadatak';
import { ProjekatService } from '../../services/projekat-service';
import { ZadatakService } from '../../services/zadatak-service';
import { ObavestenjeService } from '../../services/obavestenje-service';

@Component({
  selector: 'app-zadatak-forma',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './zadatak-forma.html',
  styleUrl: './zadatak-forma.css',
})
export class ZadatakForma implements OnInit {
  private fb = inject(FormBuilder);
  private projekti = inject(ProjekatService);
  private zadaci = inject(ZadatakService);
  private router = inject(Router);
  private obavesti = inject(ObavestenjeService);

  id = input.required({ transform: numberAttribute });
  zadatakId = input(undefined, { transform: numberAttribute });

  protected readonly statusi = Object.entries(STATUS_LABELE).map(
    ([v, l]) => [Number(v), l] as const,
  );
  protected readonly prioriteti = Object.entries(PRIORITET_LABELE).map(
    ([v, l]) => [Number(v), l] as const,
  );

  protected nazivProjekta = signal('');
  protected slanje = signal(false);
  protected forma = this.fb.nonNullable.group({
    opis: ['', [Validators.required, Validators.maxLength(2000)]],
    status: [Status.Novo, Validators.required],
    prioritet: [Prioritet.Srednji, Validators.required],
  });

  ngOnInit() {
    this.projekti.getById(this.id()).subscribe({
      next: (p) => this.nazivProjekta.set(p.naziv),
      error: () => this.router.navigateByUrl('/projekti'),
    });
    const zadatakId = this.zadatakId();
    if (zadatakId) {
      this.zadaci.getById(zadatakId).subscribe((z) => this.forma.patchValue(z));
    }
  }

  posalji() {
    if (this.forma.invalid) {
      return;
    }
    this.slanje.set(true);
    const zadatakId = this.zadatakId();
    const zadatak = { projekatId: this.id(), ...this.forma.getRawValue() };
    const zahtev = zadatakId
      ? this.zadaci.update(zadatakId, { id: zadatakId, ...zadatak })
      : this.zadaci.create(zadatak);
    zahtev.subscribe({
      next: () => {
        this.obavesti.uspeh('Zadatak je sačuvan.');
        this.router.navigate(['/projekti', this.id()]);
      },
      error: () => {
        this.slanje.set(false);
        this.obavesti.greska('Čuvanje zadatka nije uspelo.');
      },
    });
  }
}
