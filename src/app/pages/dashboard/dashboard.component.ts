import { Component, ElementRef, inject, Renderer2, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { ButtonComponent, DashbarComponent } from '@shared/components';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { MENU } from '@shared/constansts/menu.constant';
import { AuthActions } from '../auth/store/auth.actions';
import { SocketService, ToastService } from '@shared/services';
import { AppConfig } from '@shared/classes/app.config';
import { CommonService } from '@shared/services/common.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink, DashbarComponent, ButtonComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  appName = AppConfig.APP_NAME;
  menu = MENU;
  #store = inject(Store);
  #router = inject(Router);
  #notify = inject(ToastService)
  #socketService = inject(SocketService);
  #commonService = inject(CommonService);

  #renderer = inject(Renderer2);
  @ViewChild('sidebar') sidebar!: ElementRef;

  constructor() {
    this.#commonService
      .toggleSidebarObservable()
      .subscribe((isOpen: boolean) => {
        this.#renderer.setStyle(this.sidebar.nativeElement, 'display', isOpen ? 'block' : 'none');
      });
  }

  signout(): void {
    this.#store.dispatch(new AuthActions.Logout()).subscribe(() => {
      this.#socketService.disconnect();
      this.#notify.show('Hasta luego');
      this.#router.navigate(['.']);
    })
  }

}
