import { Component,computed,input, output } from '@angular/core';
import { PaginationType } from '@shared/types';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  options = input<PaginationType>();
  onChangePage = output<number>();

  currentPage = computed(() => this.options()?.currentPage);
  controlPages = computed(() => [...new Array(this.options()?.totalPages)].map((_, i) => i + 1));
  upperLimit = computed(()=> this.currentPage()! * this.options()?.resultsLength!)

  lowerLimit = computed(()=> (this.upperLimit() - this.options()?.resultsLength!) + 1);

  nextPrevPage(page: number): void {
    if(page < 1 || page > this.options()!.totalPages) return;
    this.onChangePage.emit(page);
  }

  selectPage(page: number): void {
    this.onChangePage.emit(page);
  }

}
