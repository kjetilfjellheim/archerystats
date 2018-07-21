import { Injectable }               from '@angular/core';
import { Http, Headers, RequestOptions, Response }           from '@angular/http';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Total }     from './totalstats';

@Injectable()
export class TotalStatsService {

    constructor (private http: Http) {}

    getStatisticsTotal(totalDateRange: Date[], totalDistance: number, user: string) : Observable<Total> {
        return this.http.get("/archerystats/request/statistics/totals?user=" + user + "&distance=" + totalDistance + "&fromDate=" + totalDateRange[0].toISOString().substring(0, 10) + "&toDate=" + totalDateRange[1].toISOString().substring(0, 10))
                    .map(this.extractTotal)
                    .catch(this.handleError);
    }

    private extractTotal(response : Response) : Total {
        let total = new Total();
        total.percentHigh = (response.json().verticalHigh * 100) / (response.json().verticalHigh + response.json().verticalCenter + response.json().verticalLow);
        total.percentVerticalCenter = (response.json().verticalCenter * 100) / (response.json().verticalHigh + response.json().verticalCenter + response.json().verticalLow);
        total.percentLow = (response.json().verticalLow * 100) / (response.json().verticalHigh + response.json().verticalCenter + response.json().verticalLow);
        total.percentLeft = (response.json().horizontalLeft * 100) / (response.json().horizontalLeft + response.json().horizontalCenter + response.json().horizontalRight);
        total.percentHorizontalCenter = (response.json().horizontalCenter * 100) / (response.json().horizontalLeft + response.json().horizontalCenter + response.json().horizontalRight);
        total.percentRight = (response.json().horizontalRight * 100) / (response.json().horizontalLeft + response.json().horizontalCenter + response.json().horizontalRight);
        return total;
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
