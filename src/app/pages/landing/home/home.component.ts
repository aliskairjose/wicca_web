import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AvatarComponent } from '@shared/components';
import { TopRatedInterface } from '../../dashboard/home/interfaces/top-rated.interface';
import { firstValueFrom } from 'rxjs';
import { UserInterface } from '../../dashboard/users/user.interface';
import { Store } from '@ngxs/store';
import { HomeAction } from '../../dashboard/home/store/home.actions';
import { HomeSelectors } from '../../dashboard/home/store/home.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  #store = inject(Store);
  steps: any[] = [
    {
      title: 'Registrate',
      description: 'Descarga la app y registrate con nosotros de forma fácil y rápido.'
    },
    {
      title: 'Busca',
      description: 'Busca entre nuestros asesores quien más se acerque a tus necesidades.'
    },
    {
      title: 'Consulta',
      description: 'Solicita tus consultas por chat o por llamada, lo que más prefieras.'
    },
  ];
  math = Math;
  topRatedAdvisors: TopRatedInterface[] = [];
  newUsers: UserInterface[] = [];

   ngOnInit(): void {
    this._loadData();
  }

  private async _loadData() {
    await Promise.all([
      firstValueFrom(this.#store.dispatch(new HomeAction.GetNewRegistrations)),
      firstValueFrom(this.#store.dispatch(new HomeAction.GetTopAdvisors)),
    ]);
    this.newUsers = this.#store.selectSnapshot(HomeSelectors.newRegistrations);
    this.topRatedAdvisors = this.#store.selectSnapshot(HomeSelectors.topRatedAdvisors);

  }
}
