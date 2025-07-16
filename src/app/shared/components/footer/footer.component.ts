import { Component } from '@angular/core';
import { AppConfig } from '@shared/classes/app.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  appName = AppConfig.APP_NAME;
  year = new Date().getFullYear();
}
