import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth-service';
import { paginatorIntl } from '../../services/paginator-intl';

@Component({
  selector: 'app-shell',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useFactory: paginatorIntl }],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class Shell {
  protected auth = inject(AuthService);
  private router = inject(Router);

  odjava() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
