import { DOCUMENT } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageEnum } from '@shared/enums';
import { SocketService, ToastService } from '@shared/services';
import { HSOverlay } from 'flyonui/flyonui';
import { Socket } from 'socket.io-client';
import { AuthActions } from 'src/app/pages/auth/store/auth.actions';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  modal: any;
  #socketService = inject(SocketService);
  #store = inject(Store);
  #router = inject(Router);
  #toastService = inject(ToastService);

  constructor(@Inject(DOCUMENT) private document: Document) { }

  logOut() {
    this.modal.close();
    this.#store.dispatch(new AuthActions.Logout()).subscribe(() => {
      this.#socketService.disconnect();
      this.#toastService.show(MessageEnum.GoodBye);
      this.#router.navigate([''])
    });
  }

  openModal(): void {
    this.modal = new HSOverlay(this.document.querySelector('#logout-modal')!);
    this.modal.open();
  }
}
