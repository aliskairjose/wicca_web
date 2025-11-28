import { Component, inject, OnInit, signal } from '@angular/core';
import { AdvisorPaysService } from './services/advisor-pays.service';
import {
  PaginationInterface,
  ParamsInterface,
  ResponseInterface,
} from '@shared/interfaces';
import { AdvisorPaysInterface } from './interfaces/advisor-pays.interface';
import { AvatarComponent, TableContainerComponent } from '@shared/components';
import { MetadataInterface } from '@shared/interfaces/response.interface';

@Component({
  selector: 'app-advisor-pays',
  standalone: true,
  imports: [TableContainerComponent, AvatarComponent],
  templateUrl: './advisor-pays.component.html',
  styleUrl: './advisor-pays.component.scss',
})
export class AdvisorPaysComponent implements OnInit {
  #service = inject(AdvisorPaysService);
  params: ParamsInterface = {
    search: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  };
  pagination: PaginationInterface = {
    page: 1,
    limit: 20,
  };

  data: AdvisorPaysInterface[] = [];

  metadata = signal<MetadataInterface | undefined>(undefined);

  ngOnInit(): void {
    this._loadData();
  }

  onChangeTable(e: any): void {
    this.params['search'] = e.term;
    this.pagination = e.pagination();
    this._loadData();
  }

  private _loadData(): void {
    this.#service.getList(this.params, this.pagination).subscribe({
      next: (response: ResponseInterface<AdvisorPaysInterface>) => {
        const { results, metadata } = response;
        this.metadata.set(metadata);
        this.data = results;
      },
    });
  }
}
