import { Component, OnInit, Input }    from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { Message } from 'primeng/primeng';

import { DiaryService } from './diary.service';
import { UserService } from './user.service';
import { Diary } from './diary';
import { User } from './user';

@Component({
    selector: 'diaryComponent',
    templateUrl: './diary.html',
    styleUrls: ['./diary.css']
})
export class DiaryComponent implements OnInit {

  constructor(private diaryService : DiaryService, private userService : UserService) { }

  @Input() messages : Message[] = []

  options: any;
  lineData: any;
  dateRange: Date[] = [];
  user: User = new User();

  /**
  * Options
  */
  dateRangeChoice: Date[] = [];
  userChoice : User = new User();

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
    this.dateRange.push(new Date(new Date().getFullYear(), 0, 1));
    this.dateRange.push(new Date(new Date().getFullYear(), 11, 31));
    this.dateRangeChoice.push(new Date(new Date().getFullYear(), 0, 1));
    this.dateRangeChoice.push(new Date(new Date().getFullYear(), 11, 31));
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
    this.dateRange[0] = this.dateRangeChoice[0];
    this.dateRange[1] = this.dateRangeChoice[1];
    this.user = this.userChoice;
    this.getValues();
  }

getValues(): void {
  this.diaryService
   .getDiaries(this.dateRange, this.user.id)
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
     },
     (error) =>
     {
       this.messages.push({severity:'error', summary:'Error getting values.', detail:error});
     });
   }

}
