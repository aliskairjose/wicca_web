import { Component, inject, Signal } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { RoleEnum, RoutesEnum } from '@shared/enums';
import { AuthSelectors } from 'src/app/pages/auth/store/auth.selectors';
import { Store } from '@ngxs/store';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonComponent, RouterLinkActive, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  #router = inject(Router);
  #store = inject( Store );

  goTo(): void {
    const route = this._isAuthorized()
      ? RoutesEnum.Dashboard
      : RoutesEnum.Login;
    this.#router.navigate([route]);
  }

  private _isAuthorized(): boolean {
    const isAuth = this.#store.selectSnapshot(AuthSelectors.isAuthenticated);
    const role = this.#store.selectSnapshot(AuthSelectors.userRole);
    return isAuth && role === RoleEnum.Admin;
  }
}
