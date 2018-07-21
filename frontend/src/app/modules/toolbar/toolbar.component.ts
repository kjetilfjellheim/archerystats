import { Component, OnInit, Input }    from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { Message } from 'primeng/primeng';

import { ToolbarService } from './toolbar.service';
import { User, CompetitionParam } from './toolbar';
import { ToolbarDataService }            from "./toolbardata.service";

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.html',
    styleUrls: ['./toolbar.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private toolbarService : ToolbarService, private toolbarDataService : ToolbarDataService) { }

  @Input() messages : Message[] = []

  /**
  * Options
  */
  dateRangeChoice: Date[] = [];
  distanceChoice: number = 5;
  userChoice : User = new User();
  competitionParamChoice: CompetitionParam = new CompetitionParam();

  users: any[] = [];
  parameters: any[] = [];

  ngOnInit(): void {
    this.toolbarService
       .getUsers()
       .subscribe(users =>
         {
           this.users = users;
         },
         (error) =>
         {
           this.messages.push({severity:'error', summary:'Error getting users.', detail:error});
         });
    this.toolbarDataService.dateRange.push(new Date(2017, 0, 1));
    this.toolbarDataService.dateRange.push(new Date(new Date().getFullYear(), 11, 31));
    this.dateRangeChoice.push(new Date(2017, 0, 1));
    this.dateRangeChoice.push(new Date(new Date().getFullYear(), 11, 31));
    this.toolbarService
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

  getShowDateRange() : boolean {
    return this.toolbarDataService.showDateRange;
  }

  getShowUser() : boolean {
    return this.toolbarDataService.showUser;
  }

  getShowDistance() : boolean {
    return this.toolbarDataService.showDistance;
  }

  getShowCompetitionParam() : boolean {
    return this.toolbarDataService.showCompetitionParam;
  }

  regenerate() {
    this.toolbarDataService.dateRange = this.dateRangeChoice;
    this.toolbarDataService.user = this.userChoice;
    this.toolbarDataService.competitionParam = this.competitionParamChoice;
    this.toolbarDataService.distance = this.distanceChoice;
    this.toolbarDataService.action();
  }
}
