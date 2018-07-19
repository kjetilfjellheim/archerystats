import { Component, OnInit, Input }    from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { Message } from 'primeng/primeng';

import { OvertimeStatsService } from './overtimestats.service';
import { UserService } from './user.service';
import { ValueByDate } from './overtimestats';
import { User } from './user';

@Component({
    selector: 'overtimeStatsComponent',
    templateUrl: './overtimestats.html',
    styleUrls: ['./overtimestats.css']
})
export class OvertimeStatsComponent implements OnInit {

  constructor(private overtimeStatsService : OvertimeStatsService, private userService : UserService) { }

  @Input() messages : Message[] = []

  options: any;
  lineData: any;
  totalDateRange: Date[] = [];
  totalDistance: number = 5;
  totalUser: User = new User();

  /**
  * Options
  */
  totalDateRangeChoice: Date[] = [];
  totalDistanceChoice: number = 5;
  totalUserChoice : User = new User();
  hiddenStats: boolean[] = [true, false, true, true, false, true];

  users: any[] = [];

  ngOnInit(): void {
    this.userService
       .getUsers()
       .subscribe(users =>
         {
           this.users = users;
         },
         (error) =>
         {
           this.messages.push({severity:'error', summary:'Error getting users.', detail:error});
         });
    this.totalDateRange.push(new Date(new Date().getFullYear(), 0, 1));
    this.totalDateRange.push(new Date(new Date().getFullYear(), 11, 31));
    this.totalDateRangeChoice.push(new Date(new Date().getFullYear(), 0, 1));
    this.totalDateRangeChoice.push(new Date(new Date().getFullYear(), 11, 31));
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
   this.getValues();
  }

  regenerate() {
    this.totalDateRange[0] = this.totalDateRangeChoice[0];
    this.totalDateRange[1] = this.totalDateRangeChoice[1];
    this.totalDistance = this.totalDistanceChoice;
    this.totalUser = this.totalUserChoice;
    this.getValues();
  }

getValues(): void {
  this.overtimeStatsService
   .getStatistics(this.totalDateRange, this.totalDistance, this.totalUser.id)
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
