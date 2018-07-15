import { Injectable }               from '@angular/core';
import { Http, Headers, RequestOptions, Response }           from '@angular/http';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Statistics }     from './statistics';

@Injectable()
export class StatisticsService {

    constructor (private http: Http) {}

    getStatistics() : Observable<Statistics> {
        return this.http.get("/wc/request/statistics")
                    .map(this.extractStatistics)
                    .catch(this.handleError);
    }

    private extractStatistics(response : Response) : Statistics {
        let statistics = new Statistics();
        for (var obj in response.json().perCountry16) {
          if (Number(response.json().perCountry16[obj]) > 0) {
            statistics.labelsPer16.push(obj);
            statistics.dataPer16.push(response.json().perCountry16[obj]);
          }
        }
        for (var obj in response.json().perCountry8) {
          if (Number(response.json().perCountry8[obj]) > 0) {
            statistics.labelsPer8.push(obj);
            statistics.dataPer8.push(response.json().perCountry8[obj]);
          }
        }
        for (var obj in response.json().perCountry4) {
          if (Number(response.json().perCountry4[obj]) > 0) {
            statistics.labelsPer4.push(obj);
            statistics.dataPer4.push(response.json().perCountry4[obj]);
          }
        }
        for (var obj in response.json().perCountry2) {
          if (Number(response.json().perCountry2[obj]) > 0) {
            statistics.labelsPer2.push(obj);
            statistics.dataPer2.push(response.json().perCountry2[obj]);
          }
        }
        for (var obj in response.json().perCountry1) {
          if (Number(response.json().perCountry1[obj]) > 0) {
            statistics.labelsPer1.push(obj);
            statistics.dataPer1.push(response.json().perCountry1[obj]);
          }
        }
        return statistics;
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
