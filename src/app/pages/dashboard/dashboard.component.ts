import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { ButtonComponent, DashbarComponent } from '@shared/components';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { MENU } from '@shared/constansts/menu.constant';
import { AuthActions } from '../auth/store/auth.actions';
import { SocketService, ToastService } from '@shared/services';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink, DashbarComponent, ButtonComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

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
