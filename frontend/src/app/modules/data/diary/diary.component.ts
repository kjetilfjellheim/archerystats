import { Component, OnInit, Input }    from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { Message } from 'primeng/primeng';

import { DiaryService } from './diary.service';

@Component({
    templateUrl: './diary.html',
    styleUrls: ['./diary.css']
})
export class DiaryComponent {
  @Input() messages : Message[] = []

  options: any;
  lineData: any;

  constructor(private diaryService : DiaryService) {

  }

generate(dateRange: Date[]): void {
  this.diaryService
   .getTotalTraining(dateRange)
   .subscribe(values =>
     {
       let trainingMinutes = [];
       for (var i = 0; i < values.length; i++) {
          trainingMinutes.push({
            t: new Date(values[i].date),
            y: values[i].minutes
          });
       }
       let lineData : any = {
            datasets: [
              {
                data: trainingMinutes,
                label: 'Training per week',
                borderColor: '#ff8888',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                lineWidth: 5,
              }
            ]
       }
       this.options = {
           responsive: false,
           maintainAspectRatio: true,
           scales: {
                 xAxes: [{
                     type: 'time',
                     time: {
                         isoWeekday: true,
                         unit: 'week',
                         displayFormats: {
                             week: 'W, YYYY'
                         },
                         min: trainingMinutes[0].t,
                         max: trainingMinutes[trainingMinutes.length - 1].t,
                         minUnit: 'week',
                         stepSize: 1
                     },
                     distribution: 'linear'
                 }],
                 yAxes: [{
                     ticks: {
                         min: 0,
                         stepSize: 60
                     }
                 }]
             }
         }
         this.lineData = lineData;
     },
     (error) =>
     {
       this.messages.push({severity:'error', summary:'Error getting values.', detail:error});
     });
   }

}
