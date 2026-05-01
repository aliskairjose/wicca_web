import { Component, inject, signal } from '@angular/core';
import { RoleEnum, RoutesEnum } from '@shared/enums';
import { AuthSelectors } from 'src/app/pages/auth/store/auth.selectors';
import { Store } from '@ngxs/store';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  #router = inject(Router);
  #store = inject(Store);

  isHomePage = signal<boolean>(true);

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isHomePage.set(event.urlAfterRedirects === '/');
    });
  }

  goTo(): void {
    const route = this._isAuthorized()
      ? RoutesEnum.Dashboard
      : `auth/${RoutesEnum.Login}`;
    this.#router.navigate([route]);
  }

  private _isAuthorized(): boolean {
    const isAuth = this.#store.selectSnapshot(AuthSelectors.isAuthenticated);
    const role = this.#store.selectSnapshot(AuthSelectors.userRole);
    return isAuth && role === RoleEnum.Admin;
  }
}
