import { Component, inject, } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { DashbarComponent } from '@shared/components';
import { MENU } from '@shared/constansts/menu.constant';
import { AuthActions } from '../auth/store/auth.actions';
import { SocketService, ToastService } from '@shared/services';
import { AppConfig } from '@shared/classes/app.config';
import { DashboardFooterComponent } from "@shared/components/dashboard-footer/dashboard-footer.component";
import { SideMenuComponent } from '@shared/components/side-menu/side-menu.component';
import { PaginationInterface, ParamsInterface } from '@shared/interfaces';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, DashbarComponent, SideMenuComponent, DashboardFooterComponent, DashboardFooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  appName = AppConfig.APP_NAME;
  pagination: PaginationInterface = {
    page: 1,
    limit: 0
  };
  queryParams: ParamsInterface = {};
  menu = MENU;
  #store = inject(Store);
  #router = inject(Router);
  #notify = inject(ToastService)
  #socketService = inject(SocketService);

  signout(): void {
    this.#store.dispatch(new AuthActions.Logout()).subscribe(() => {
      this.#socketService.disconnect();
      this.#notify.show('Hasta luego');
      this.#router.navigate(['.']);
    })
  }

}
