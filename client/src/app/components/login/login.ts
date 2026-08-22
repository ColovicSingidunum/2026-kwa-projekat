import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth-service';
import { ObavestenjeService } from '../../services/obavestenje-service';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private obavesti = inject(ObavestenjeService);

  protected slanje = signal(false);
  protected sakrivena = signal(true);
  protected forma = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    lozinka: ['', Validators.required],
  });

  posalji() {
    if (this.forma.invalid) {
      return;
    }
    this.slanje.set(true);
    this.auth.login(this.forma.getRawValue()).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => {
        this.slanje.set(false);
        this.obavesti.greska('Pogrešan email ili lozinka.');
      },
    });
  }
}
