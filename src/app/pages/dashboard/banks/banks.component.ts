import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { BankSelectors } from './store/bank.selctors';
import { PaginationInterface, ParamsInterface } from '@shared/interfaces';
import { firstValueFrom } from 'rxjs';
import { BankActions } from './store/bank.actions';
import { BankInterface } from './interfaces/bank.interface';
import { MetadataInterface } from '@shared/interfaces/response.interface';
import { TableContainerComponent } from '@shared/components';

@Component({
  selector: 'app-banks',
  standalone: true,
  imports: [TableContainerComponent],
  templateUrl: './banks.component.html',
  styleUrl: './banks.component.scss'
})
export class BanksComponent implements OnInit {

  #store = inject(Store);
  pagination: PaginationInterface = {
    page: 1,
    limit: 20
  };
  queryParams: ParamsInterface = {};

  banks: BankInterface[] = [];
  metadata = signal<MetadataInterface | undefined>(undefined);
  fileContent: string | ArrayBuffer | null = '';


  ngOnInit(): void {
    this._getData();
  }

  onChangeTable(e: any): void {
    this.queryParams['search'] = e.term;
    this.pagination = e.pagination();
    this.dispatch();
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const formData = new FormData();


    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.fileContent = reader.result; // File content is stored here
      };

      reader.readAsText(file); // Reads the file as text

      formData.set('file', file);

      await firstValueFrom(this.#store.dispatch(new BankActions.PostFile(formData)));
      await this.dispatch();
    }
  }

  private _getData(): void {
    this.#store.selectOnce(BankSelectors.list).subscribe(data => {
      if (!data) { this.dispatch() } else {
        this.banks = data!.results;
        this.metadata.set(data!.metadata);
      };

    });
  }

  private async dispatch() {
    await firstValueFrom(this.#store.dispatch(new BankActions.List(this.queryParams, this.pagination)));
    this._getData();
  }
}
