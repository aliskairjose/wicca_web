import { Component, inject, Signal } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Router } from 'express';
import { RoleEnum, RoutesEnum } from '@shared/enums';
import { AuthSelectors } from 'src/app/pages/auth/store/auth.selectors';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonComponent],
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
    const isAuth: Signal<boolean> = this.#store.selectSignal(
      AuthSelectors.isAuthenticated
    );
    const role: Signal<string | undefined> = this.#store.selectSignal(
      AuthSelectors.userRole
    );
    return isAuth() && role() === RoleEnum.Admin;
  }
}
