import { Component, inject, OnInit, signal, OnChanges } from '@angular/core';
import { Store } from '@ngxs/store';
import { ButtonComponent, InputComponent, SwitchComponent, TableContainerComponent } from '@shared/components';
import { PaginationInterface, ParamsInterface } from '@shared/interfaces';
import { CategoryInterface } from './interfaces/category.interface';
import { MetadataInterface } from '@shared/interfaces/response.interface';
import { firstValueFrom } from 'rxjs';
import { CategoryAction } from './store/category.action';
import { CategorySelectors } from './store/category.selectors';
import { DatePipe } from '@angular/common';
import { HSOverlay } from 'flyonui/flyonui';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StatusDirective } from '@shared/directives';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TableContainerComponent, DatePipe, ButtonComponent, StatusDirective, ReactiveFormsModule, InputComponent, SwitchComponent],
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
  isActive = true;
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

  onChange(checked: boolean) {
    this.form.patchValue({ isActive: checked });
  }

  add(): void {
    this.isActive = true;
    this.openModal();
  }

  edit(cat: CategoryInterface) {
    this.isEdit = true;
    this.id = cat._id;
    this.isActive = cat.isActive;
    this.form.patchValue({
      name: cat.name,
      isActive: cat.isActive
    });
    this.openModal();
  }

  delete(id: string) {
    this.id = id;
    this.openDeleteModal();
  }

  async deleteItem() {
    this.closeDeleteModal();
    await firstValueFrom(this.#store.dispatch(new CategoryAction.Delete(this.id)));
    this.getData();
  }

  private _loadForm(): void {
    this.form = this.#fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      isActive: [true]
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

  private openDeleteModal() {
    const modal = new HSOverlay(document.querySelector('#delete-modal')!);
    modal.open();
  }

  closeModal() {
    const modal = new HSOverlay(document.querySelector('#scroll-inside-modal')!);
    modal.close();
    setTimeout(() => {
      this._loadForm()
      this.isEdit = false
    }, 100);
  }

  closeDeleteModal() {
    const modal = new HSOverlay(document.querySelector('#delete-modal')!);
    modal.close();
  }

  private async getData() {
    await firstValueFrom(this.#store.dispatch(new CategoryAction.List(this.queryParams, this.pagination)));
    const { results, metadata } = this.#store.selectSnapshot(CategorySelectors.list)!;
    this.categories.set(results);
    this.metadata.set(metadata);
  }
}
