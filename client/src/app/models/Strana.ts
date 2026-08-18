export const VELICINE_STRANE = [5, 10, 15, 20] as const;

export type VelicinaStrane = (typeof VELICINE_STRANE)[number];
export type Parametri = Record<string, string | number | boolean>;

export interface Strana<T> {
  sadrzaj: T[];
  ukupno: number;
  broj: number;
  velicina: number;
}

export interface PaginiranUpit {
  strana?: number;
  velicina?: VelicinaStrane;
}

// Ulaz: objekat upita, npr. { projekatId: 5, status: 0, prioritet: undefined }
// Izlaz: parametri bez undefined/null, uz zadržanu 0, npr. { projekatId: 5, status: 0 }
export function filtrirajParametre(upit: object): Parametri {
  const params: Parametri = {};
  for (const [kljuc, vrednost] of Object.entries(upit)) {
    if (vrednost !== undefined && vrednost !== null) {
      params[kljuc] = vrednost as string | number | boolean;
    }
  }
  return params;
}
