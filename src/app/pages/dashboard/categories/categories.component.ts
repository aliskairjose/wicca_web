import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { ButtonComponent, InputComponent, TableContainerComponent } from '@shared/components';
import { PaginationInterface, ParamsInterface } from '@shared/interfaces';
import { CategoryInterface } from './interfaces/category.interface';
import { MetadataInterface } from '@shared/interfaces/response.interface';
import { firstValueFrom } from 'rxjs';
import { CategoryAction } from './store/category.action';
import { CategorySelectors } from './store/category.selectors';
import { DatePipe } from '@angular/common';
import { HSOverlay } from 'flyonui/flyonui';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TableContainerComponent, DatePipe, ButtonComponent, ReactiveFormsModule, InputComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  form!: FormGroup;
  #fb = inject(FormBuilder);
  pagination: PaginationInterface = {
    page: 1,
    limit: 20
  };
  queryParams: ParamsInterface = {};
  #store = inject(Store);

  categories = signal<CategoryInterface[] | undefined>(undefined);
  metadata = signal<MetadataInterface | undefined>(undefined);
  isEdit = false;
  id = '';

  constructor() {
    this.getData();
  }

  ngOnInit(): void {
    this._loadForm();
  }

  get f() {
    return this.form.controls;
  }

  onChangeTable(e: any): void {
    this.queryParams['search'] = e.term;
    this.pagination = e.pagination();
    this.getData()
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.closeModal();
      this.isEdit
        ? this.update()
        : this.create();
    };
  }

  add(): void {
    this.openModal();
  }

  edit(cat: CategoryInterface) {
    this.isEdit = true;
    this.id = cat._id;
    this.form.patchValue({ name: cat.name });
    this.openModal();
  }

  async delete(id: string) {
    await firstValueFrom(this.#store.dispatch(new CategoryAction.Delete(id)));
    this.getData();
  }

  private _loadForm(): void {
    this.form = this.#fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }


  private async create() {
    await firstValueFrom(this.#store.dispatch(new CategoryAction.Add(this.form.value)));
    this.getData();
  }

  private async update() {
    await firstValueFrom(this.#store.dispatch(new CategoryAction.Update(this.id, this.form.value)));
    this.getData();
  }

  private openModal() {
    const modal = new HSOverlay(document.querySelector('#scroll-inside-modal')!);
    modal.open();
  }

  closeModal() {
    const modal = new HSOverlay(document.querySelector('#scroll-inside-modal')!);
    modal.close();
    setTimeout(() => {
      this._loadForm()
      this.isEdit = false, 100
    });
  }

  private async getData() {
    await firstValueFrom(this.#store.dispatch(new CategoryAction.List(this.queryParams, this.pagination)));
    const { results, metadata } = this.#store.selectSnapshot(CategorySelectors.list)!;
    this.categories.set(results);
    this.metadata.set(metadata);
  }
}
