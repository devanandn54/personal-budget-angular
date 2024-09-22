import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as d3 from "d3";

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit, AfterViewInit {
  budgetData: any[] = [];
  constructor(private dataService: DataService){}
  ngOnInit(): void {
    this.loadData()
  }
  ngAfterViewInit(): void {
    this.createChart();
  }

  loadData(): void{
    this.dataService.getBudgetData().subscribe(
      (res) => {
        this.budgetData = res.myBudget;
        this.createChart();
      },
      (err) => {
        console.error('Error fetching data', err);
      }
    )
  }

  createChart(): void{
    if(!this.budgetData || this.budgetData.length === 0){
      return;
    }
    const width = 600;
    const height = 600;
    const radius = Math.min(width, height) / 2;

    d3.select('#chart').selectAll('*').remove();

    const svg = d3
    .select('#chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

    const pie = d3
      .pie<any>()
      .value((d) => d.budget)
      .sort(null);

      const arc = d3
      .arc<any>()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.4);

      const arcs = svg
      .selectAll('arc')
      .data(pie(this.budgetData))
      .enter()
      .append('g')
      .attr('class', 'arc');

      arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => d.data.color);

      arcs
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .text((d) => d.data.title)
      .style('font-size', '12px')
      .style('fill', 'white')
      .style('font-weight', 'bold');
  }
  
  

}
