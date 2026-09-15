import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Projekat } from '../models/Projekat';
import { StatistikaProjekta } from '../models/Statistika';
import { Strana, PaginiranUpit, filtrirajParametre } from '../models/Strana';

export interface ProjekatUpit extends PaginiranUpit {
  pretraga?: string;
}

@Injectable({ providedIn: 'root' })
export class ProjekatService {
  private http = inject(HttpClient);
  private url = '/api/projekti';

  readonly poslednjiUpit: ProjekatUpit = { strana: 0, velicina: 5, pretraga: '' };

  query(upit: ProjekatUpit = {}) {
    return this.http.get<Strana<Projekat>>(this.url, { params: filtrirajParametre(upit) });
  }

  getById(id: number) {
    return this.http.get<Projekat>(`${this.url}/${id}`);
  }

  statistika(id: number) {
    return this.http.get<StatistikaProjekta>(`${this.url}/${id}/statistika`);
  }

  create(projekat: Omit<Projekat, 'id'>) {
    return this.http.post<Projekat>(this.url, projekat);
  }

  update(id: number, projekat: Projekat) {
    return this.http.put<Projekat>(`${this.url}/${id}`, projekat);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
