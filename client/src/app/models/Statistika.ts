export type StatistikaProjekta = Omit<Statistika, 'projekti'>;

export interface Statistika {
  projekti: number;
  zadaci: number;
  novo: number;
  uToku: number;
  zavrseno: number;
}
