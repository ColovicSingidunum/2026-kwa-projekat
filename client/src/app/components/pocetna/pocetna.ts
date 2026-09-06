import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Statistika } from '../../models/Statistika';
import { StatistikaService } from '../../services/statistika-service';

@Component({
  selector: 'app-pocetna',
  imports: [MatCardModule],
  templateUrl: './pocetna.html',
  styleUrl: './pocetna.css',
})
export class Pocetna {
  protected statistika = signal<Statistika | null>(null);

  constructor() {
    inject(StatistikaService)
      .get()
      .subscribe((s) => this.statistika.set(s));
  }
}
