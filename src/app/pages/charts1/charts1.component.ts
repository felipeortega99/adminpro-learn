import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-charts1',
  templateUrl: './charts1.component.html',
  styles: []
})
export class Charts1Component implements OnInit {
  graphs: any = {
    graph1: {
      labels: ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      data:  [24, 30, 46],
      type: 'doughnut',
      leyend: 'El pan se come con'
    },
    graph2: {
      labels: ['Hombres', 'Mujeres'],
      data:  [4500, 6000],
      type: 'doughnut',
      leyend: 'Entrevistados'
    },
    graph3: {
      labels: ['Si', 'No'],
      data:  [95, 5],
      type: 'doughnut',
      leyend: '¿Le dan gases los frijoles?'
    },
    graph4: {
      labels: ['No', 'Si'],
      data:  [85, 15],
      type: 'doughnut',
      leyend: '¿Le importa que le den gases?'
    },
  };

  constructor() { }

  ngOnInit(): void {
  }

}
