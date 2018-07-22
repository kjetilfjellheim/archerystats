import { Component, OnInit, Input }    from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { Message } from 'primeng/primeng';
import { ToolbarDataService } from '../toolbar/toolbardata.service';

import { DiaryService } from './diary.service';
import { Diary } from './diary';

@Component({
    selector: 'diary',
    templateUrl: './diary.html',
    styleUrls: ['./diary.css']
})
export class DiaryComponent implements OnInit {

  constructor(private diaryService : DiaryService, private toolbarDataService : ToolbarDataService) { }

  @Input() messages : Message[] = []

  options: any;
  lineData: any;

  ngOnInit(): void {
    this.toolbarDataService.addEventListener(this);
    this.toolbarDataService.showDateRange = true;
    this.toolbarDataService.showDistance = false;
    this.toolbarDataService.showUser = true;
    this.toolbarDataService.showCompetitionParam = false;
    this.options = {
      responsive: false,
      maintainAspectRatio: true,
      scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'month',
                    displayFormats: {
                        quarter: 'MMM, YY'
                    },
                    min: new Date(2017, 0 , 1),
                    max: new Date(),
                    minUnit: 'day'
                },
                distribution: 'series'
            }],
            yAxes: [{
                ticks: {
                    min: 0
                }
            }]
        }
    };
    this.regenerate();
  }

regenerate(): void {
  this.diaryService
   .getDiaries(this.toolbarDataService.dateRange, this.toolbarDataService.user.id)
   .subscribe(values =>
     {
       let trainingMinutes = [];
       for (var i = 0; i < values.length; i++) {
          trainingMinutes.push({
            t: new Date(values[i].date),
            y: values[i].minutes
          });
       }
       this.lineData = {
            datasets: [
              {
                data: trainingMinutes,
                label: 'Training minutes per week',
                borderColor: '#ff8888',
                backgroundColor: 'rgba(0, 0, 0, 0)'
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
                        unit: 'month',
                        displayFormats: {
                            quarter: 'MMM, YY'
                        },
                        min: trainingMinutes[0].t,
                        max: trainingMinutes[trainingMinutes.length - 1].t,
                        minUnit: 'month',
                        stepSize: 1
                    },
                    distribution: 'linear'
                }],
                yAxes: [{
                    ticks: {
                        min: 0
                    }
                }]
            }
        };
     },
     (error) =>
     {
       this.messages.push({severity:'error', summary:'Error getting values.', detail:error});
     });
   }

}
