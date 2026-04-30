import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ButtonComponent, InputComponent } from '@shared/components';
import { SocketService, ToastService } from '@shared/services';
import { AuthActions } from '../store/auth.actions';
import { MessageEnum, RoutesEnum } from '@shared/enums';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  #fb = inject(FormBuilder);
  #store = inject(Store);
  #router = inject(Router);
  #toastService = inject(ToastService);
  #socketService = inject(SocketService);

  form: FormGroup = this.#fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.form.valid && this._login(this.form.value);
  }

  private _login(data: any): void {
    this.#store.dispatch(new AuthActions.Login(data)).subscribe(() => {
      this.#socketService.connect();
      this.#toastService.show(MessageEnum.Welcome);
      this.#router.navigate([RoutesEnum.Dashboard]);
    });
  }

}
