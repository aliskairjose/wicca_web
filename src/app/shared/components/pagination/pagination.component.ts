import { Component, computed, input, output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { OPTION_DATA, SelectComponent } from '../select/select.component';
import { LIMIT_PER_PAGE } from '@shared/constansts';
import { PaginationInterface } from '@shared/interfaces';
import { MetadataInterface } from '@shared/interfaces/response.interface';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [ButtonComponent, SelectComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  defaultValue = LIMIT_PER_PAGE;
  itemPerPage: OPTION_DATA[] = [
    { val: 5, title: '5' },
    { val: 10, title: '10' },
    { val: 20, title: '20' },
    { val: 50, title: '50' },
  ];
  options = input<MetadataInterface>();
  onChangePage = output<number>();

  currentPage = computed(() => this.options()?.currentPage);
  controlPages = computed(() => [...new Array(this.options()?.totalPages)].map((_, i) => i + 1));
  upperLimit = computed(() => this.currentPage()! * this.options()?.resultsLength!)
  lowerLimit = computed(() => (this.upperLimit() - this.options()?.resultsLength!) + 1);

  nextPrevPage(page: number): void {
    if (page < 1 || page > this.options()!.totalPages) return;
    this.onChangePage.emit(page);
  }

  selectPage(page: number): void {
    this.onChangePage.emit(page);
  }

}
