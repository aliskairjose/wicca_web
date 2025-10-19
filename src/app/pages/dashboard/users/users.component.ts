import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserInterface } from './user.interface';
import { UserAction } from './store/user.actions';
import { CommonModule } from '@angular/common';
import { UserSelectors } from './store/user.selectors';
import { firstValueFrom } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaginationInterface, ParamsInterface } from '@shared/interfaces';
import { ConnectStatusEnum, LanguageEnum, RoleEnum, RoutesEnum } from '@shared/enums';
import { AvatarComponent, InputComponent, SelectComponent, TableContainerComponent, TextareaComponent } from '@shared/components';
import { StatusDirective } from '@shared/directives';
import { RouterLink } from '@angular/router';
import { MetadataInterface } from '@shared/interfaces/response.interface';
import { OPTION_DATA } from '@shared/components/select/select.component';
import { CategoryAction } from '../categories/store/category.action';
import { Helper } from '@shared/helpers';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StatusDirective, RouterLink, AvatarComponent, TableContainerComponent, InputComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  form!: FormGroup;
  advisorForm!: FormGroup;
  #fb = inject(FormBuilder);

  isSubmited = signal(false);
  pagination: PaginationInterface = {
    page: 1,
    limit: 20
  };
  queryParams: ParamsInterface = {
    search: '',
    role: RoleEnum.User
  };
  #store = inject(Store);
  isEdit = signal(false);

  users = signal<UserInterface[] | undefined>(undefined);
  modalUser: UserInterface | undefined;
  metadata = signal<MetadataInterface | undefined>(undefined);
  routeEnum = RoutesEnum;

  languages: OPTION_DATA[] = [
    { val: '', title: 'Seleccione un idioma' },
    { val: LanguageEnum.SPANISH, title: 'Español' },
    { val: LanguageEnum.ENGLISH, title: 'Inglés' },
  ];


  constructor() {
    this.getData();
  }

  async ngOnInit() {
    this._loadForm();
    await firstValueFrom(this.#store.dispatch(new CategoryAction.ListNoPagination()));
  }

  get f() {
    return this.form.controls;
  }

  private _loadForm(): void {
    this.form = this.#fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [Helper.generatePassword()],
      role: [RoleEnum.User],
      phone: ['', [Validators.required]],
      country: ['', [Validators.required]],
      language: ['', [Validators.required]],
      isActive: [true],
    });
  }


  onChangeTable(e: any): void {
    this.queryParams['search'] = e.term;
    this.pagination = e.pagination();
    this.getData()
  }

  async createUser(): Promise<void> {
    this.isSubmited.set(true);
    if (this.form.valid) {
      firstValueFrom(this.#store.dispatch(new UserAction.Create(this.form.value)));
      this.resetForm();
      this.ngOnInit();
    }
  }

  openModal(user: UserInterface) {
    this.modalUser = user;
  }

  delete() {
    this.changeUserStatus(this.modalUser!);
    this.modalUser = undefined;
  }

  resetForm(): void {
    const hasValues = Object.values(this.form.value).every(v => !v);
    if (hasValues) {
      this.advisorForm.reset();
      this.form.reset();
      this.isEdit.set(false);
    }
  }

  private changeUserStatus(user: UserInterface): void {
    const _user: Partial<UserInterface> = {
      isActive: !user.isActive,
      connectStatus: user.isActive ? ConnectStatusEnum.Away : ConnectStatusEnum.Offline
    };

    this.update(user._id, _user);
  }

  private async update(id: string, payload: Partial<UserInterface>) {
    await firstValueFrom(this.#store.dispatch(new UserAction.Update(id, payload)));
    const { results, metadata } = this.#store.selectSnapshot(UserSelectors.list)!;
    this.users.set([]);
    setTimeout(() => this.users.set(results), 100);
    this.metadata.set(metadata);
  }

  private async getData() {
    await firstValueFrom(this.#store.dispatch(new UserAction.List(this.queryParams, this.pagination)));
    const { results, metadata } = this.#store.selectSnapshot(UserSelectors.list)!;
    this.users.set(results);
    this.metadata.set(metadata);
  }

}
