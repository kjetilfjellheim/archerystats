import { Component, OnInit, Input }    from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Message } from 'primeng/primeng';

import { ToolbarDataService } from '../toolbar/toolbardata.service';
import { OvertimeStatsService } from './overtimestats.service';
import { ValueByDate } from './overtimestats';

@Component({
    selector: 'overtimestats',
    templateUrl: './overtimestats.html',
    styleUrls: ['./overtimestats.css']
})
export class OvertimeStatsComponent implements OnInit {

  constructor(private overtimeStatsService : OvertimeStatsService, private toolbarDataService : ToolbarDataService) { }

  @Input() messages : Message[] = []

  options: any;
  lineData: any;

  hiddenStats: boolean[] = [true, false, true, true, false, true];

  ngOnInit(): void {
    this.toolbarDataService.addEventListener(this);
    this.toolbarDataService.showDateRange = true;
    this.toolbarDataService.showDistance = true;
    this.toolbarDataService.showUser = true;
    this.toolbarDataService.showCompetitionParam = false;
    this.options = {
      responsive: false,
      maintainAspectRatio: true,
      scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        quarter: 'MMM D'
                    }
                },
                distribution: 'series'
            }],
            yAxes: [{
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 100,
                }
            }]
        }
    };
    this.regenerate();
  }

regenerate(): void {
  this.overtimeStatsService
   .getStatistics(this.toolbarDataService.dateRange, this.toolbarDataService.distance, this.toolbarDataService.user.id)
   .subscribe(values =>
     {
       let verticalLowPercentLineData = [];
       let verticalCenterPercentLineData = [];
       let verticalHighPercentLineData = [];
       let horizontalLeftPercentLineData = [];
       let horizontalCenterPercentLineData = [];
       let horizontalRightPercentLineData = [];
       for (var i = 0; i < values.length; i++) {
          verticalLowPercentLineData.push({
            t: new Date(values[i].date),
            y: values[i].verticalLowPercent
          });
          verticalCenterPercentLineData.push({
            t: new Date(values[i].date),
            y: values[i].verticalCenterPercent
          });
          verticalHighPercentLineData.push({
            t: new Date(values[i].date),
            y: values[i].verticalHighPercent
          });
          horizontalLeftPercentLineData.push({
            t: new Date(values[i].date),
            y: values[i].horizontalLeftPercent
          });
          horizontalCenterPercentLineData.push({
            t: new Date(values[i].date),
            y: values[i].horizontalCenterPercent
          });
          horizontalRightPercentLineData.push({
            t: new Date(values[i].date),
            y: values[i].horizontalRightPercent
          });
       }
       this.lineData = {
            datasets: [
                {
                  data: verticalLowPercentLineData,
                  label: 'Vertical low percentage',
                  borderColor: '#ff8888',
                  backgroundColor: 'rgba(0, 0, 0, 0)'
                },
                {
                  data: verticalCenterPercentLineData,
                  label: 'Vertical center percentage',
                  borderColor: '#aaffaa',
                  backgroundColor: 'rgba(0, 0, 0, 0)'
                },
                {
                  data: verticalHighPercentLineData,
                  label: 'Vertical high percentage',
                  borderColor: '#8888ff',
                  backgroundColor: 'rgba(0, 0, 0, 0)'
                },
                {
                  data: horizontalLeftPercentLineData,
                  label: 'Horizontal left percentage',
                  borderColor: '#ff0000',
                  backgroundColor: 'rgba(0, 0, 0, 0)'
                },
                {
                  data: horizontalCenterPercentLineData,
                  label: 'Horizontal center percentage',
                  borderColor: '#00ff00',
                  backgroundColor: 'rgba(0, 0, 0, 0)'
                },
                {
                  data: horizontalRightPercentLineData,
                  label: 'Horizontal right percentage',
                  borderColor: '#0000ff',
                  backgroundColor: 'rgba(0, 0, 0, 0)'
                }
            ]
        }
     },
     (error) =>
     {
       this.messages.push({severity:'error', summary:'Error getting values.', detail:error});
     });
   }

}
