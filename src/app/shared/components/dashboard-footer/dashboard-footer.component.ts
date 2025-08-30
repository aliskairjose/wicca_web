import { Component } from '@angular/core';
import { AppConfig } from '@shared/classes/app.config';

@Component({
  selector: 'app-dashboard-footer',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-footer.component.html',
  styleUrl: './dashboard-footer.component.scss'
})
export class DashboardFooterComponent {
  appName = AppConfig.APP_NAME;
  year = new Date().getFullYear();
}
