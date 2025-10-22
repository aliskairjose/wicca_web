import { Component, computed, Inject, inject, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { CommonModule, DOCUMENT } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaginationInterface, ParamsInterface } from '@shared/interfaces';
import { ConnectStatusEnum, LanguageEnum, RoleEnum, RoutesEnum, StatusEnum } from '@shared/enums';
import { AvatarComponent, ButtonComponent, InputComponent, SelectComponent, TableContainerComponent, TextareaComponent } from '@shared/components';
import { StatusDirective } from '@shared/directives';
import { Router, RouterLink } from '@angular/router';
import { MetadataInterface } from '@shared/interfaces/response.interface';
import { OPTION_DATA } from '@shared/components/select/select.component';
import { CategoryAction } from '../categories/store/category.action';
import { CategorySelectors } from '../categories/store/category.selectors';
import { CategoryInterface } from '../categories/interfaces/category.interface';
import { Helper } from '@shared/helpers';
import { UserInterface } from '../users/user.interface';
import { UserAction } from '../users/store/user.actions';
import { UserSelectors } from '../users/store/user.selectors';
import { HSOverlay } from 'flyonui/flyonui';


@Component({
  selector: 'app-advisors',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StatusDirective, RouterLink, AvatarComponent, TableContainerComponent, InputComponent, SelectComponent, TextareaComponent, ButtonComponent, AvatarComponent],
  templateUrl: './advisors.component.html',
  styleUrl: './advisors.component.scss'
})
export class AdvisorsComponent {
  form!: FormGroup;
  advisorForm!: FormGroup;
  #fb = inject(FormBuilder);
  #advisorFb = inject(FormBuilder);

  #router = inject(Router);

  isSubmited = signal(false);
  pagination: PaginationInterface = {
    page: 1,
    limit: 20
  };
  queryParams: ParamsInterface = {
    search: '',
    role: RoleEnum.Advisor,
    populate: 'advisor wallet'
  };
  #store = inject(Store);
  isEdit = signal(false);

  users = signal<UserInterface[] | undefined>(undefined);
  modalUser: UserInterface | undefined;
  metadata = signal<MetadataInterface | undefined>(undefined);
  routeEnum = RoutesEnum;
  categories: OPTION_DATA[] = [];

  selectedRole = signal<RoleEnum | ''>('');
  isAdvisor = computed(() => this.selectedRole() === RoleEnum.Advisor);

  enabledCall = signal<boolean>(false);
  statusEnum = StatusEnum
  status = [
    { val: StatusEnum.APPROVED, title: 'Aprobado' },
    { val: StatusEnum.PENDING, title: 'Pendiente de aprobación' },
    { val: StatusEnum.REJECT, title: 'Rechazado' },
    { val: StatusEnum.UNDER_REVIEW, title: 'En revisión' },
  ]


  languages: OPTION_DATA[] = [
    { val: '', title: 'Seleccione un idioma' },
    { val: LanguageEnum.SPANISH, title: 'Español' },
    { val: LanguageEnum.ENGLISH, title: 'Inglés' },
  ];


  constructor(@Inject(DOCUMENT) private document: Document) {
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

  changeStatus(event: any, user: UserInterface) {
    const status = event.target.value;
    if (status !== user.status) {
      const _user: Partial<UserInterface> = {
        status: status,
        email: user.email
      };
      this.updateStatus(user._id, _user);
    }
  }

  onChangeTable(e: any): void {
    this.queryParams['search'] = e.term;
    this.pagination = e.pagination();
    this.getData()
  }

  onCheckChange(value: any): void {
    this.enabledCall.set(value);
    if (value) {
      this.advisorF['callPrice'].setValidators([Validators.required]);
    } else {
      this.advisorF['callPrice'].clearValidators();
      this.advisorF['callPrice'].setValue('');
    }
    this.advisorF['callPrice'].updateValueAndValidity();
  }

  delete() {
    this.changeUserStatus(this.modalUser!);
    this.modalUser = undefined;
  }

  openModal(type: string, user?: UserInterface): void {
    if (user) {
      this.modalUser = { ...user };
    }
    setTimeout(() => {
      const modal = new HSOverlay(this.document.querySelector(type)!);
      modal.open();
    }, 100);
  }

  closeModal(type: string): void {
    const modal = new HSOverlay(this.document.querySelector(type)!);
    modal.close();
  }

  async createUser(): Promise<void> {
    this.isSubmited.set(true);
    if (this.form.valid) {
      firstValueFrom(this.#store.dispatch(new UserAction.Create(this.form.value)));
      if (this.isAdvisor()) {
        const newUser = this.#store.selectSnapshot(UserSelectors.newUser)!;
        const advisorData = {
          ...this.advisorForm.value,
          user: newUser._id
        };
        await firstValueFrom(this.#store.dispatch(new UserAction.CreateAdvisorInfo(advisorData)));
      }
      this.resetForm();
      this.ngOnInit();
    }
  }

  private _loadForm(): void {
    this.form = this.#fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [Helper.generatePassword()],
      role: [RoleEnum.Advisor],
      phone: ['', [Validators.required]],
      country: ['', [Validators.required]],
      language: ['', [Validators.required]],
      isActive: [true],
    });
  }

  private _loadAdvisorForm(): void {
    this.advisorForm = this.#advisorFb.group({
      chatPrice: ['', [Validators.required]],
      callPrice: ['', [Validators.required]],
      enabledCall: [false],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }


  private resetForm(): void {
    this.advisorForm.reset();
    this.form.reset();
    this.isEdit.set(false);
    this.selectedRole.set('');
    this.enabledCall.set(false);

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

  private async updateStatus(id: string, payload: Partial<UserInterface>) {
    await firstValueFrom(this.#store.dispatch(new UserAction.UpdateStatus(id, payload)));
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
