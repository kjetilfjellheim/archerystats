import { Injectable }               from '@angular/core';
import { Http, Headers, RequestOptions, Response }           from '@angular/http';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User, CompetitionParam }     from './toolbar';

@Injectable()
export class ToolbarDataService {
  dateRange: Date[] = [];
  distance: number = 5;
  user: User = new User();
  competitionParam: CompetitionParam = new CompetitionParam();

  showDateRange: boolean = false;
  showDistance: boolean = false;
  showUser: boolean = false;
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
