import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { AuthOdgovor, Korisnik, Prijava, Registracija } from '../models/Korisnik';

const TOKEN = 'token';
const KORISNIK = 'korisnik';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private url = '/api/auth';

  private korisnik = signal<Korisnik | null>(JSON.parse(localStorage.getItem(KORISNIK) ?? 'null'));
  readonly trenutni = this.korisnik.asReadonly();
  readonly prijavljen = computed(() => this.korisnik() !== null);

  login(prijava: Prijava) {
    return this.http
      .post<AuthOdgovor>(`${this.url}/login`, prijava)
      .pipe(tap((o) => this.sacuvaj(o)));
  }

  register(registracija: Registracija) {
    return this.http
      .post<AuthOdgovor>(`${this.url}/register`, registracija)
      .pipe(tap((o) => this.sacuvaj(o)));
  }

  logout() {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(KORISNIK);
    this.korisnik.set(null);
  }

  get token(): string | null {
    return localStorage.getItem(TOKEN);
  }

  private sacuvaj(odgovor: AuthOdgovor) {
    localStorage.setItem(TOKEN, odgovor.token);
    localStorage.setItem(KORISNIK, JSON.stringify(odgovor.korisnik));
    this.korisnik.set(odgovor.korisnik);
  }
}
