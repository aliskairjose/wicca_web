import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { TableContainerComponent } from '@shared/components';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TableContainerComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  #store = inject(Store);
}
