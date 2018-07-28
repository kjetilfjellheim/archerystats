import { Component, OnInit, Input }    from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { Message } from 'primeng/primeng';

import { ToolbarService } from './toolbar.service';
import { CompetitionParam } from './toolbar';
import { ToolbarDataService }            from "./toolbardata.service";

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.html',
    styleUrls: ['./toolbar.css']
})
export class ToolbarComponent implements OnInit {

  @Input() messages : Message[] = []

  dateRangeChoice: Date[] = [];
  minDistanceChoice: number = 5;
  maxDistanceChoice: number = 10;
  competitionParamChoice: CompetitionParam = new CompetitionParam();

  parameters: any[] = [];

  constructor(private toolbarService : ToolbarService, private toolbarDataService : ToolbarDataService) {
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

  ngOnInit(): void {

  }

  getShowDateRange() : boolean {
    return this.toolbarDataService.showDateRange;
  }

  getShowDistance() : boolean {
    return this.toolbarDataService.showDistance;
  }

  getShowCompetitionParam() : boolean {
    return this.toolbarDataService.showCompetitionParam;
  }

  regenerate() {
    this.toolbarDataService.dateRange = this.dateRangeChoice;
    this.toolbarDataService.competitionParam = this.competitionParamChoice;
    this.toolbarDataService.minDistance = this.minDistanceChoice;
    this.toolbarDataService.maxDistance = this.maxDistanceChoice;
    this.toolbarDataService.action();
  }
}
