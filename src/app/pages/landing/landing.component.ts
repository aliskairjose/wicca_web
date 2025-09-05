import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AvatarComponent, NavbarComponent } from '@shared/components';
import { FooterComponent } from "@shared/components/footer/footer.component";
import { TopRatedInterface } from '../dashboard/home/interfaces/top-rated.interface';
import { HomeAction } from '../dashboard/home/store/home.actions';
import { Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { HomeSelectors } from '../dashboard/home/store/home.selectors';
import { UserInterface } from '../dashboard/users/user.interface';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, AvatarComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',

})
export class LandingComponent implements OnInit {

  math = Math;
  topRatedAdvisors: TopRatedInterface[] = [];
  newUsers: UserInterface[] = [];
  #store = inject(Store);

  steps: any[] = [
    {
      title: 'Registrate',
      icon: 'edit',
      description: 'Descarga la app y registrate con nosotros de forma fácil y rápido.'
    },
    {
      title: 'Busca',
      icon: 'world-search',
      description: 'Busca entre nuestros asesores quien más se acerque a tus necesidades.'
    },
    {
      title: 'Consulta',
      icon: 'message-user',
      description: 'Solicita tus consultas por chat o por llamada, lo que más prefieras.'
    },
  ];

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
