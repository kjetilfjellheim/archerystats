import { Component, OnInit, Input }    from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { Message } from 'primeng/primeng';

import { CompetitionDataService } from './competitiondata.service';
import { UserService } from './user.service';
import { CompetitionParam, Competition } from './competitiondata';
import { User } from './user';

@Component({
    selector: 'competitionData',
    templateUrl: './competitiondata.html',
    styleUrls: ['./competitiondata.css']
})
export class CompetitionDataComponent implements OnInit {

  constructor(private competitionDataService : CompetitionDataService, private userService : UserService) { }

  @Input() messages : Message[] = []

  options: any;
  lineData: any;
  dateRange: Date[] = [new Date("2017-01-01"), new Date()];
  user: User = new User();
  competitionParam: CompetitionParam = new CompetitionParam();
  /**
  * Options
  */
  dateRangeChoice: Date[] = [];
  userChoice : User = new User();
  competitionParamChoice: CompetitionParam = new CompetitionParam();

  users: any[] = [];
  parameters: any[] = [];

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
                    suggestedMin: 0
                }
            }]
        }
    };
   this.getParameters();
  }

  regenerate() {
    this.dateRange[0] = this.dateRangeChoice[0];
    this.dateRange[1] = this.dateRangeChoice[1];
    this.user = this.userChoice;
    this.competitionParam = this.competitionParamChoice;
    this.getCompetionResults();
  }

getParameters(): void {
  this.competitionDataService
   .getCompetitionParam()
   .subscribe(values =>
     {
       this.parameters = values;
     },
     (error) =>
     {
       this.messages.push({severity:'error', summary:'Error getting parameters.', detail:error});
     });
   }

   getCompetionResults(): void {
     this.competitionDataService
      .getCompetition(this.dateRange, this.competitionParam.id, this.user.id)
      .subscribe(values =>
        {
          let data = [];
          for (var i = 0; i < values.length; i++) {
             data.push({
               t: new Date(values[i].date),
               y: values[i].value
             });
           }
           this.lineData = {
                datasets: [
                    {
                      data: data,
                      label: 'Scores',
                      borderColor: '#ff8888',
                      backgroundColor: 'rgba(0, 0, 0, 0)'
                    }
                ]
            }
        },
        (error) =>
        {
          this.messages.push({severity:'error', summary:'Error getting competitionResults.', detail:error});
        });
      }

}
