import { Component, OnInit, inject, input, numberAttribute, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ObavestenjeService } from '../../services/obavestenje-service';
import { ProjekatService } from '../../services/projekat-service';

@Component({
  selector: 'app-projekat-forma',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './projekat-forma.html',
  styleUrl: './projekat-forma.css',
})
export class ProjekatForma implements OnInit {
  private fb = inject(FormBuilder);
  private projekti = inject(ProjekatService);
  private router = inject(Router);
  private obavesti = inject(ObavestenjeService);

  id = input(undefined, { transform: numberAttribute });

  protected slanje = signal(false);
  protected forma = this.fb.nonNullable.group({
    naziv: ['', Validators.required],
    opis: ['', [Validators.required, Validators.maxLength(2000)]],
    rokRealizacije: ['', Validators.required],
  });

  ngOnInit() {
    const id = this.id();
    if (id) {
      this.projekti.getById(id).subscribe((p) => this.forma.patchValue(p));
    }
  }

  posalji() {
    if (this.forma.invalid) {
      return;
    }
    this.slanje.set(true);
    const id = this.id();
    const v = this.forma.getRawValue();
    const zahtev = id ? this.projekti.update(id, { id, ...v }) : this.projekti.create(v);
    zahtev.subscribe({
      next: (p) => {
        this.obavesti.uspeh('Projekat je sačuvan.');
        this.router.navigate(['/projekti', p.id]);
      },
      error: () => {
        this.slanje.set(false);
        this.obavesti.greska('Čuvanje projekta nije uspelo.');
      },
    });
  }
}
