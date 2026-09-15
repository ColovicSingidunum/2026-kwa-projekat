export enum Status {
  Novo = 0,
  UToku = 1,
  Zavrseno = 2,
}

export enum Prioritet {
  Nizak = 0,
  Srednji = 1,
  Visok = 2,
}

export const STATUS_LABELE: Record<Status, string> = {
  [Status.Novo]: 'Novo',
  [Status.UToku]: 'U toku',
  [Status.Zavrseno]: 'Završeno',
};

export const PRIORITET_LABELE: Record<Prioritet, string> = {
  [Prioritet.Nizak]: 'Nizak',
  [Prioritet.Srednji]: 'Srednji',
  [Prioritet.Visok]: 'Visok',
};

export const STATUSI = Object.entries(STATUS_LABELE).map(
  ([v, l]) => [Number(v) as Status, l] as const,
);

export const PRIORITETI = Object.entries(PRIORITET_LABELE).map(
  ([v, l]) => [Number(v) as Prioritet, l] as const,
);

export interface Zadatak {
  id: number;
  projekatId: number;
  opis: string;
  status: Status;
  prioritet: Prioritet;
}
