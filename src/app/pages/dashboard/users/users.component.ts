import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserInterface } from './user.interface';
import { UserAction } from './store/user.actions';
import { CommonModule } from '@angular/common';
import { UserSelectors } from './store/user.selectors';
import { firstValueFrom } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaginationInterface, ParamsInterface } from '@shared/interfaces';
import { ConnectStatusEnum, RoleEnum, RoutesEnum } from '@shared/enums';
import { AvatarComponent, ButtonComponent, InputComponent, SelectComponent, TableContainerComponent } from '@shared/components';
import { StatusDirective } from '@shared/directives';
import { RouterLink } from '@angular/router';
import { MetadataInterface } from '@shared/interfaces/response.interface';
import { HSOverlay } from 'flyonui/flyonui';
import { OPTION_DATA } from '@shared/components/select/select.component';
import { CategoryAction } from '../categories/store/category.action';
import { CategorySelectors } from '../categories/store/category.selectors';
import { CategoryInterface } from '../categories/interfaces/category.interface';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, StatusDirective, RouterLink, AvatarComponent, TableContainerComponent, InputComponent, SelectComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  form!: FormGroup;
  advisorForm!: FormGroup;
  #fb = inject(FormBuilder);
  #advisorFb = inject(FormBuilder);

  pagination: PaginationInterface = {
    page: 1,
    limit: 20
  };
  queryParams: ParamsInterface = {
    search: ''
  };
  #store = inject(Store);
  isEdit = signal(false);

  // users: UserInterface[] = [];
  users = signal<UserInterface[] | undefined>(undefined);
  modalUser: UserInterface | undefined;
  metadata = signal<MetadataInterface | undefined>(undefined);
  routeEnum = RoutesEnum;
  roles: OPTION_DATA[] = [
    { val: RoleEnum.Advisor, title: 'Asesor' },
    { val: RoleEnum.User, title: 'Usuario' }
  ];
  categories: OPTION_DATA[] = [];

  selectedRole = signal<RoleEnum>(RoleEnum.Advisor);
  isAdvisor = computed(() => this.selectedRole() === RoleEnum.Advisor);

  constructor() {
    this.getData();
  }

  async ngOnInit() {
    this._loadForm();
    this._loadAdvisorForm();
    await firstValueFrom(this.#store.dispatch(new CategoryAction.ListNoPagination()));
    const cats = this.#store.selectSnapshot(CategorySelectors.listNoPagination);
    cats.forEach((cat: CategoryInterface) => {
      this.categories.push({ val: cat._id, title: cat.name });
    });
  }

  get f() {
    return this.form.controls;
  }
  get advisorF() {
    return this.advisorForm.controls;
  }

  onSubmit(): void {
    // this.form.valid && this._newUser(this.form.value);
  }


  private _loadForm(): void {
    this.form = this.#fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['Asesor', [Validators.required]],
      phone: ['', [Validators.required]],
      country: ['', [Validators.required]],
      isActive: [true],
      connectStatus: [ConnectStatusEnum.Offline]
    });
  }

  private _loadAdvisorForm(): void {
    this.advisorForm = this.#advisorFb.group({
      chatPrice: ['', [Validators.required]],
      callPrice: ['', [Validators.required]],
      enabledCall: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  add(): void {
    console.log('Add user');
    this.openNewUserModal();
  }

  onChangeTable(e: any): void {
    console.log('onChange', e.pagination())
    this.queryParams['search'] = e.term;
    this.pagination = e.pagination();
    this.getData()
  }

  async openModal(user: UserInterface) {
    this.modalUser = user;
    const modal = new HSOverlay(document.querySelector('#basic-modal')!);
    modal.open();
  }

  async closeModal(res: boolean) {
    const modal = new HSOverlay(document.querySelector('#basic-modal')!);
    modal.close();
    (res) && this.changeUserStatus(this.modalUser!);
    this.modalUser = undefined;
  }

  private openNewUserModal() {
    const modal = new HSOverlay(document.querySelector('#new-user-modal')!);
    modal.open();
  }

  async closeNewUserModal(res: boolean) {
    const modal = new HSOverlay(document.querySelector('#new-user-modal')!);
    modal.close();
    (res) && this.changeUserStatus(this.modalUser!);
    this.modalUser = undefined;
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
