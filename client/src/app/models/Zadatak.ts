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

export interface Zadatak {
  id: number;
  projekatId: number;
  opis: string;
  status: Status;
  prioritet: Prioritet;
}
