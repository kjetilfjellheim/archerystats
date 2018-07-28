import { Injectable }               from '@angular/core';
import { Http, Headers, RequestOptions, Response }           from '@angular/http';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { CompetitionParam }     from './toolbar';

@Injectable()
export class ToolbarDataService {
  dateRange: Date[] = [];
  minDistance: number = 5;
  maxDistance: number = 10;
  competitionParam: CompetitionParam = new CompetitionParam();

  showDateRange: boolean = false;
  showDistance: boolean = false;
  showCompetitionParam: boolean = false;

  listeners: Set<any> = new Set<any>([]);

  addEventListener(obj : any) {
    this.listeners.add(obj);
  }

  removeEventListener(obj : any) {
    this.listeners.delete(obj);
  }

  action() {
    console.log();
    this.listeners.forEach(function(obj) {
      obj.regenerate();
    });
  }

}
