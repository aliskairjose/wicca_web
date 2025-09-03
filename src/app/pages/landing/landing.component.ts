import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '@shared/components';
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
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {

  topRatedAdvisors: TopRatedInterface[] = [];
  newUsers: UserInterface[] = [];
  #store = inject(Store);

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
