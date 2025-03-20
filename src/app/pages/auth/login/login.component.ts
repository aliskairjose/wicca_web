import { Component } from '@angular/core';
import { ButtonComponent, InputComponent } from '@shared/components';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
