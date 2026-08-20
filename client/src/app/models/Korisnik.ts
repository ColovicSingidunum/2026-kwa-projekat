export interface Korisnik {
  id: number;
  email: string;
  ime: string;
  prezime: string;
}

export interface Prijava {
  email: string;
  lozinka: string;
}

export interface Registracija {
  email: string;
  lozinka: string;
  ime: string;
  prezime: string;
}

export interface AuthOdgovor {
  token: string;
  korisnik: Korisnik;
}
