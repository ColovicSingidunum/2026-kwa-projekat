import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Strana, PaginiranUpit, filtrirajParametre } from '../models/Strana';
import { Zadatak, Status, Prioritet } from '../models/Zadatak';

export interface ZadatakUpit extends PaginiranUpit {
  projekatId?: number;
  status?: Status | '';
  prioritet?: Prioritet | '';
}

@Injectable({ providedIn: 'root' })
export class ZadatakService {
  private http = inject(HttpClient);
  private url = '/api/zadaci';

  readonly poslednjiUpit: ZadatakUpit = { strana: 0, velicina: 5, status: '', prioritet: '' };

  query(upit: ZadatakUpit = {}) {
    return this.http.get<Strana<Zadatak>>(this.url, { params: filtrirajParametre(upit) });
  }

  getById(id: number) {
    return this.http.get<Zadatak>(`${this.url}/${id}`);
  }

  create(zadatak: Omit<Zadatak, 'id'>) {
    return this.http.post<Zadatak>(this.url, zadatak);
  }

  update(id: number, zadatak: Zadatak) {
    return this.http.put<Zadatak>(`${this.url}/${id}`, zadatak);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
