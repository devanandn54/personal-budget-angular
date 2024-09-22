import { Component } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { ChartComponent } from '../chart/chart.component';


interface Dataset{
  data: any[],
  backgroundColor: string[]

}
interface DataSource{
  datasets: Dataset[],
  labels: string[]

}
@Component({
  selector: 'pb-homepage',
  standalone: true,
  imports: [ArticleComponent, BreadcrumbsComponent, ChartComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  private chart: Chart | null = null;
  constructor(private http: HttpClient, private dataService: DataService){

  }

  

  public dataSource: DataSource = {
    datasets: [
        {
            data: [] as number [],
            backgroundColor: [
                '#ffcd56', // yellow
                '#ff6384', // pink/red
                '#36a2eb', // blue
                '#fd6b19', // orange
                '#4bc0c0', // teal
                '#9966ff', // purple
                '#ff9f40', // light orange
                '#c9cbcf'  // light gray
            ],

        }
    ],
    labels: [] as string []
};
  
  ngOnInit(): void{
    this.dataService.getBudgetData().subscribe((res: any) => {
      for (let i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;    
    }
    this.createChart();

    })
  }

  // ngAfterViewInit(): void{
  //   this.createChart();
  // }

  createChart() {
    Chart.register(...registerables);
    const ctx = document.getElementById("myChart") as HTMLCanvasElement;
  
    if (ctx) {
      // Destroy the existing chart instance if it exists
      if (this.chart) {
        this.chart.destroy();
      }
  
      // Create a new chart with explicit types
      const config: ChartConfiguration<'pie', number[]> = {
        type: 'pie',
        data: this.dataSource
      };
  
      this.chart = new Chart(ctx.getContext("2d")!, config as unknown as ChartConfiguration);
    }
  }
}
