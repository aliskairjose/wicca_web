import { Component, inject, input, OnInit, output, Signal, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OPTION_DATA, SelectComponent } from '../select/select.component';
import { PaginationType } from '@shared/types';
import { PaginationInterface } from '@shared/interfaces';
import { LIMIT_PER_PAGE } from '@shared/constansts';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { InputComponent } from '../input/input.component';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-table-container',
  standalone: true,
  imports: [SelectComponent, InputComponent, CommonModule, ReactiveFormsModule, PaginationComponent],
  templateUrl: './table-container.component.html',
  styleUrl: './table-container.component.scss'
})
export class TableContainerComponent implements OnInit {
  #term = '';
  paginationOptions = input<PaginationType | undefined>(undefined);
  form!: FormGroup;
  #fb = inject(FormBuilder);

  itemsPerPage: OPTION_DATA[] = [
    { val: 5, title: '5' },
    { val: 10, title: '10' },
    { val: 20, title: '20' },
    { val: 50, title: '50' },
  ];

  pagination = signal<PaginationInterface>({
    limit: LIMIT_PER_PAGE,
    page: 1,
  });

  onChange = output<{ pagination: WritableSignal<PaginationInterface>, term: string }>();

  constructor() { this.setForm(); }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(400)
    ).subscribe(res => {
      this.#term = res.term;
      this.pagination.update(options => ({ ...options, page: 1 }));
      this.onEmit(this.pagination, this.#term)
    })
  }

  onPageChange(page: number): void {
    this.pagination.update(options => ({ ...options, page }));
    this.onEmit(this.pagination, this.#term)
  }

  onChanteItemPerPage(limit: number): void {
    this.pagination.update(() => ({ limit, page: 1 }));
    this.onEmit(this.pagination, this.#term)
  }

  private onEmit(pagination: WritableSignal<PaginationInterface>, term: string): void {
    this.onChange.emit({ pagination, term })
  }

  private setForm(): void {
    this.form = this.#fb.group({
      term: ['']
    })
  }
}
