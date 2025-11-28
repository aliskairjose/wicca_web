import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { AdvisorPaysService } from './services/advisor-pays.service';
import {
  PaginationInterface,
  ParamsInterface,
  ResponseInterface,
} from '@shared/interfaces';
import { AdvisorPaysInterface } from './interfaces/advisor-pays.interface';
import {
  AvatarComponent,
  SelectComponent,
  TableContainerComponent,
} from '@shared/components';
import { MetadataInterface } from '@shared/interfaces/response.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OPTION_DATA } from '@shared/components/select/select.component';
import { MONTHS_ARRAY } from '@shared/constansts/months.constants';


@Component({
  selector: 'app-advisor-pays',
  standalone: true,
  imports: [
    TableContainerComponent,
    AvatarComponent,
    CurrencyPipe,
    DatePipe,
    SelectComponent,
  ],
  templateUrl: './advisor-pays.component.html',
  styleUrl: './advisor-pays.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdvisorPaysComponent implements OnInit {
  months = MONTHS_ARRAY;
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

  selectedMonth = new Date().getMonth() + 1;
  selectedYear = new Date().getFullYear();

  years: OPTION_DATA[] = [
    {
      val: 2023,
      title: '2023',
    },
    {
      val: 2024,
      title: '2024',
    },
  ];

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

  onChangeYear(value: string | number): void {
    this.params['year'] = value;
  }

  onChangeMonth(value: string | number): void {
    this.params['month'] = value;
  }

  find(): void {
    this.pagination.page = 1;
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
