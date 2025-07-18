import { AfterViewInit, Component, input } from '@angular/core';
import { SummaryMonthlyStatusInterface } from 'src/app/pages/dashboard/home/interfaces/request-pie-chart.interface';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};
@Component({
  selector: 'app-column-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './column-chart.component.html',
  styleUrl: './column-chart.component.scss'
})
export class ColumnChartComponent implements AfterViewInit {
  series = input<SummaryMonthlyStatusInterface[]>([]);

  chartOptions: Partial<ChartOptions> = {
    series: [],
    chart: {
      type: "bar",
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%"
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"]
    },
    xaxis: {
      categories: [
        "Ene",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ],
    },
    yaxis: {
      title: {
        text: "(Solicitudes)"
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " solicitudes";
        }
      }
    }
  };

  ngAfterViewInit(): void {
    console.log(this.series());
    this.chartOptions.series = this.series();
  }
}
