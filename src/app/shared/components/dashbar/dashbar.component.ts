import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AvatarComponent } from '../avatar/avatar.component';
import { Store } from '@ngxs/store';
import { AuthSelectors } from 'src/app/pages/auth/store/auth.selectors';
import { CommonService } from '@shared/services/common.service';

@Component({
  selector: 'app-dashbar',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './dashbar.component.html',
  styleUrl: './dashbar.component.scss'
})
export class DashbarComponent {
  title = inject(Title);
  #store = inject(Store);
  isOpen = true;

  user = this.#store.selectSnapshot(AuthSelectors.userLogged);

}
