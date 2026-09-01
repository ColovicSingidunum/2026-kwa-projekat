import { MatPaginatorIntl } from '@angular/material/paginator';

export function paginatorIntl() {
  const intl = new MatPaginatorIntl();
  intl.itemsPerPageLabel = 'Po strani:';
  intl.firstPageLabel = 'Prva strana';
  intl.previousPageLabel = 'Prethodna strana';
  intl.nextPageLabel = 'Sledeća strana';
  intl.lastPageLabel = 'Poslednja strana';
  intl.getRangeLabel = (strana, velicina, ukupno) =>
    ukupno === 0
      ? '0 od 0'
      : `${strana * velicina + 1} – ${Math.min((strana + 1) * velicina, ukupno)} od ${ukupno}`;
  return intl;
}
