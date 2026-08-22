import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth-service';
import { ObavestenjeService } from '../../services/obavestenje-service';

function lozinkeSePoklapaju(grupa: AbstractControl) {
  return grupa.get('lozinka')?.value === grupa.get('potvrda')?.value
    ? null
    : { nepoklapanje: true };
}

class PotvrdaMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return !!control?.touched && (control.invalid || !!control.parent?.hasError('nepoklapanje'));
  }
}

@Component({
  selector: 'app-register',
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
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private obavesti = inject(ObavestenjeService);

  protected slanje = signal(false);
  protected sakrivenaLozinka = signal(true);
  protected sakrivenaPotvrda = signal(true);
  protected potvrdaMatcher = new PotvrdaMatcher();
  protected forma = this.fb.nonNullable.group(
    {
      email: ['', [Validators.required, Validators.email]],
      lozinka: ['', [Validators.required, Validators.minLength(6)]],
      potvrda: ['', Validators.required],
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
    },
    { validators: lozinkeSePoklapaju },
  );

  posalji() {
    if (this.forma.invalid) {
      return;
    }
    this.slanje.set(true);
    const v = this.forma.getRawValue();
    this.auth
      .register({ email: v.email, lozinka: v.lozinka, ime: v.ime, prezime: v.prezime })
      .subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: () => {
          this.slanje.set(false);
          this.obavesti.greska('Registracija nije uspela.');
        },
      });
  }
}
