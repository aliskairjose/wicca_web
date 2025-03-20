import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashbar',
  standalone: true,
  imports: [],
  templateUrl: './dashbar.component.html',
  styleUrl: './dashbar.component.scss'
})
export class DashbarComponent {
  title = inject( Title );
}
