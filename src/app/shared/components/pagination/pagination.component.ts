import { Component, computed, input, output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { OPTION_DATA } from '../select/select.component';
import { LIMIT_PER_PAGE } from '@shared/constansts';
import { MetadataInterface } from '@shared/interfaces/response.interface';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [ButtonComponent],
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
  metadata = input.required<MetadataInterface>();
  onChangePage = output<number>();

  currentPage = computed(() => {
    console.log(this.metadata())
    return this.metadata().currentPage
  });
  controlPages = computed(() => [...new Array(this.metadata().totalPages)].map((_, i) => i + 1));
  upperLimit = computed(() => this.currentPage() * this.metadata().resultsLength)
  lowerLimit = computed(() => (this.upperLimit() - this.metadata().resultsLength) + 1);

  nextPrevPage(page: number): void {
    if (page < 1 || page > this.metadata()!.totalPages) return;
    this.onChangePage.emit(page);
  }

  selectPage(page: number): void {
    this.onChangePage.emit(page);
  }

}
