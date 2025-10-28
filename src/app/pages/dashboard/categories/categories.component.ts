import { Component, inject, OnInit, signal, OnChanges, Inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { ButtonComponent, InputComponent, SwitchComponent, TableContainerComponent } from '@shared/components';
import { PaginationInterface, ParamsInterface } from '@shared/interfaces';
import { CategoryInterface } from './interfaces/category.interface';
import { MetadataInterface } from '@shared/interfaces/response.interface';
import { firstValueFrom } from 'rxjs';
import { CategoryAction } from './store/category.action';
import { CategorySelectors } from './store/category.selectors';
import { DatePipe, DOCUMENT } from '@angular/common';
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

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.getData();
  }

  ngOnInit(): void {
    this._loadForm();
  }

  get f() {
    return this.form.controls;
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const formData = new FormData();


    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      formData.set('file', file);

      await firstValueFrom(this.#store.dispatch(new CategoryAction.PostFile(formData)));
      await this.dispatch();
    }
  }

  onChangeTable(e: any): void {
    this.queryParams['search'] = e.term;
    this.pagination = e.pagination();
    this.dispatch();
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
    const modal = new HSOverlay(this.document.querySelector('#scroll-inside-modal')!);
    modal.open();
  }

  private openDeleteModal() {
    const modal = new HSOverlay(this.document.querySelector('#delete-modal')!);
    modal.open();
  }

  closeModal() {
    const modal = new HSOverlay(this.document.querySelector('#scroll-inside-modal')!);
    modal.close();
    setTimeout(() => {
      this._loadForm()
      this.isEdit = false
    }, 100);
  }

  closeDeleteModal() {
    const modal = new HSOverlay(this.document.querySelector('#delete-modal')!);
    modal.close();
  }

  private async getData() {
    this.#store.selectOnce(CategorySelectors.list).subscribe(data => {
      (!data) && this.dispatch();
      this.categories.set(data!.results);
      this.metadata.set(data!.metadata);
    });
  }

  private async dispatch() {
    await firstValueFrom(this.#store.dispatch(new CategoryAction.List(this.queryParams, this.pagination)));
    this.getData();
  }
}
