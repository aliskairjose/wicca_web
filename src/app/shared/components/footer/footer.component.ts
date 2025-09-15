import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppConfig } from '@shared/classes/app.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  appName = AppConfig.APP_NAME;
  year = new Date().getFullYear();
}
