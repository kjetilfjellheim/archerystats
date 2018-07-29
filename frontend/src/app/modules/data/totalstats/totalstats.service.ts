import { Injectable }               from '@angular/core';
import { Http, Headers, RequestOptions, Response }           from '@angular/http';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { VerticalTotal, HorizontalTotal }     from './totalstats';

@Injectable()
export class TotalStatsService {

    constructor (private http: Http) {}

    public getStatisticsVerticalTotal(dateRange: Date[], minDistance: number, maxDistance: number) : Observable<VerticalTotal> {
        return this.http.get("/archerystats/request/statistics/verticaltotals?mindistance=" + minDistance + "&maxdistance=" + maxDistance + "&fromDate=" + dateRange[0].toISOString().substring(0, 10) + "&toDate=" + dateRange[1].toISOString().substring(0, 10))
                    .map(this.extractVerticalTotal)
                    .catch(this.handleError);
    }

    public getStatisticsHorizontalTotal(dateRange: Date[], minDistance: number, maxDistance: number) : Observable<HorizontalTotal> {
        return this.http.get("/archerystats/request/statistics/horizontaltotals?mindistance=" + minDistance + "&maxdistance=" + maxDistance + "&fromDate=" + dateRange[0].toISOString().substring(0, 10) + "&toDate=" + dateRange[1].toISOString().substring(0, 10))
                    .map(this.extractHorizontalTotal)
                    .catch(this.handleError);
    }

    public getStatisticsHorizontalLastTrainingTotal(minDistance: number, maxDistance: number) : Observable<HorizontalTotal> {
        return this.http.get("/archerystats/request/statistics/horizontaltotalslasttraining?mindistance=" + minDistance + "&maxdistance=" + maxDistance)
                    .map(this.extractHorizontalTotal)
                    .catch(this.handleError);
    }

    public getStatisticsVerticalLastTrainingTotal(minDistance: number, maxDistance: number) : Observable<VerticalTotal> {
        return this.http.get("/archerystats/request/statistics/verticaltotalslasttraining?mindistance=" + minDistance + "&maxdistance=" + maxDistance)
                    .map(this.extractVerticalTotal)
                    .catch(this.handleError);
    }

    private extractVerticalTotal(response : Response) : VerticalTotal {
        let total = new VerticalTotal();
        total.percentHigh = (response.json().verticalHigh * 100) / (response.json().verticalHigh + response.json().verticalCenter + response.json().verticalLow);
        total.percentCenter = (response.json().verticalCenter * 100) / (response.json().verticalHigh + response.json().verticalCenter + response.json().verticalLow);
        total.percentLow = (response.json().verticalLow * 100) / (response.json().verticalHigh + response.json().verticalCenter + response.json().verticalLow);
        return total;
    }

    private extractHorizontalTotal(response : Response) : HorizontalTotal {
        let total = new HorizontalTotal();
        total.percentLeft = (response.json().horizontalLeft * 100) / (response.json().horizontalLeft + response.json().horizontalCenter + response.json().horizontalRight);
        total.percentCenter = (response.json().horizontalCenter * 100) / (response.json().horizontalLeft + response.json().horizontalCenter + response.json().horizontalRight);
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
