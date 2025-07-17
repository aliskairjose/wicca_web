import { AfterViewInit, Component, input } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, NgApexchartsModule } from 'ng-apexcharts';

type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-circular-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './circular-chart.component.html',
  styleUrl: './circular-chart.component.scss'
})
export class CircularChartComponent implements AfterViewInit {
  series = input<number[]>([]);
  labels = input<string[]>([]);

  chartOptions: Partial<ChartOptions> = {
    series: [],
    chart: {
      width: '100%',
      type: 'pie',
    },
    labels: [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  ngAfterViewInit(): void {
    this.chartOptions.series = this.series();
    this.chartOptions.labels = this.labels();

  }

}
