import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AvatarComponent, IconComponent } from '@shared/components';
import { DatePipe } from '@angular/common';
import { HomeSelectors } from './store/home.selectors';
import { firstValueFrom } from 'rxjs';
import { HomeAction } from './store/home.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AvatarComponent, DatePipe, IconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  #store = inject(Store);
  dashboard = this.#store.selectSnapshot(HomeSelectors.dashboard);

  async ngOnInit() {
    (!this.dashboard) && this.loadData();
  }

  private async loadData() {
    console.log('LoadData')
    await firstValueFrom(this.#store.dispatch(new HomeAction.Get));
    this.dashboard = this.#store.selectSnapshot(HomeSelectors.dashboard);
    console.log(this.dashboard)

  }

}
