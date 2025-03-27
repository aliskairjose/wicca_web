import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LIMIT_PER_PAGE } from '@shared/constansts';
import { PaginationInterface } from '@shared/interfaces';
import { OPTION_DATA, SelectComponent } from '../select/select.component';
import { CommonModule, DatePipe } from '@angular/common';
import { InputComponent } from '../input/input.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [DatePipe, InputComponent, SelectComponent, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  form!: FormGroup;
  #fb = inject(FormBuilder);

  headers = input.required<string[]>();
  data = input.required<any[]>();
  defaultValue = LIMIT_PER_PAGE;

  pagination = signal<PaginationInterface>({
    page: 1,
    limit: LIMIT_PER_PAGE
  });
  itemPerPage: OPTION_DATA[] = [
    { val: 5, title: '5' },
    { val: 10, title: '10' },
    { val: 20, title: '20' },
    { val: 50, title: '50' },
  ];

  ngOnInit(): void {
    this.loadForm();
  }

  onChanteItemPerPage(limit: number): void {

  }

  private loadForm(): void {
    this.form = this.#fb.group({
      search: ['']
    })
  }

}
