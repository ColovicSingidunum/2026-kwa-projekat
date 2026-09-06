import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Statistika } from '../models/Statistika';

@Injectable({ providedIn: 'root' })
export class StatistikaService {
  private http = inject(HttpClient);

  get() {
    return this.http.get<Statistika>('/api/statistika');
  }
}
