import { Injectable }               from '@angular/core';
import { Http, Headers, RequestOptions, Response }           from '@angular/http';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ValueByDate }     from './overtimestats';

@Injectable()
export class OvertimeStatsService {

    constructor (private http: Http) {}

    getStatistics(totalDateRange: Date[], totalDistance: number, user: string) : Observable<ValueByDate[]> {
        return this.http.get("/archerystats/request/statistics/overtime?user=" + user + "&distance=" + totalDistance + "&fromDate=" + totalDateRange[0].toISOString().substring(0, 10) + "&toDate=" + totalDateRange[1].toISOString().substring(0, 10))
                    .map(this.extractResult)
                    .catch(this.handleError);
    }

    private extractResult(response : Response) : ValueByDate[] {
        let vals : ValueByDate[] = [];
        for (var key in response.json()) {
          let data = response.json()[key];
          let val : ValueByDate = new ValueByDate();
          val.verticalHighPercent = (data.verticalHigh * 100) / (data.verticalHigh + data.verticalCenter + data.verticalLow);
          val.verticalCenterPercent = (data.verticalCenter * 100) / (data.verticalHigh + data.verticalCenter + data.verticalLow);
          val.verticalLowPercent = (data.verticalLow * 100) / (data.verticalHigh + data.verticalCenter + data.verticalLow);
          val.horizontalLeftPercent = (data.horizontalLeft * 100) / (data.horizontalLeft + data.horizontalCenter + data.horizontalRight);
          val.horizontalCenterPercent = (data.horizontalCenter * 100) / (data.horizontalLeft + data.horizontalCenter + data.horizontalRight);
          val.horizontalRightPercent = (data.horizontalRight * 100) / (data.horizontalLeft + data.horizontalCenter + data.horizontalRight);
          val.date = new Date(key);
          vals.push(val);
        }
        return vals;
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            errMsg = error.json().message || '';
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }

}
