import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { PaginationInterface, ParamsInterface } from '@shared/interfaces';
import { MetadataInterface } from '@shared/interfaces/response.interface';
import { firstValueFrom } from 'rxjs';
import { RequestLogsActions } from './store/request.action';
import { RequestLogsSelectors } from './store/request.selctors';
import { AvatarComponent, BadgeComponent, TableContainerComponent } from '@shared/components';
import { RequestByAsesorInterface } from './interfaces/request-logs.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-request-logs',
  standalone: true,
  imports: [AvatarComponent, TableContainerComponent],
  templateUrl: './request-logs.component.html',
  styleUrl: './request-logs.component.scss'
})
export class RequestLogsComponent {
  pagination: PaginationInterface = {
    page: 1,
    limit: 20
  };
  queryParams: ParamsInterface = {};
  metadata = signal<MetadataInterface | undefined>(undefined);

  #store = inject(Store);

  logs: RequestByAsesorInterface[] = [];

  constructor() {
    this._getData();
  }

  private async _getData() {
    await firstValueFrom(this.#store.dispatch(new RequestLogsActions.List(this.queryParams, this.pagination)));
    this.logs = this.#store.selectSnapshot(RequestLogsSelectors.list)!;
  }
}
