import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RateStatsInterface } from 'src/app/pages/dashboard/users/user.interface';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'app-rate-stats',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent],
  templateUrl: './rate-stats.component.html',
  styleUrl: './rate-stats.component.scss'
})
export class RateStatsComponent {
  stats = input.required<RateStatsInterface>();

  starsCount = computed(() => {
    const { average, reviews, ...stars } = this.stats();
    return {
      '5 estrellas': stars.fiveStars,
      '4 estrellas': stars.fourStars,
      '3 estrellas': stars.threeStars,
      '2 estrellas': stars.twoStars,
      '1 estrellas': stars.oneStars,
    };
  });

  getPercents(qty: number): number {
    return (qty / this.stats().reviews) * 100;
  }
}
