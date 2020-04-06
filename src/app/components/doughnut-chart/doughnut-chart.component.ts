import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styles: []
})
export class DoughnutChartComponent implements OnInit {

  @Input() labels: Array<Label>;
  @Input() data: SingleDataSet;
  @Input() leyend: string;

  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
  }

}
