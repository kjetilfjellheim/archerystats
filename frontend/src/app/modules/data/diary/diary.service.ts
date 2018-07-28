import { Injectable }               from '@angular/core';
import { Http, Headers, RequestOptions, Response }           from '@angular/http';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { TrainingMinutes }     from './diary';

@Injectable()
export class DiaryService {

    constructor (private http: Http) {}

    getTotalTraining(dateRange: Date[]) : Observable<TrainingMinutes[]> {
        return this.http.get("/archerystats/request/statistics/trainingminutes?fromDate=" + dateRange[0].toISOString().substring(0, 10) + "&toDate=" + dateRange[1].toISOString().substring(0, 10))
                    .map(this.extractResult)
                    .catch(this.handleError);
    }

    getTrainingSpt(dateRange: Date[], spt: number) : Observable<TrainingMinutes[]> {
        return this.http.get("/archerystats/request/statistics/trainingminutes?fromDate=" + dateRange[0].toISOString().substring(0, 10) + "&toDate=" + dateRange[1].toISOString().substring(0, 10) + "&spt=" + spt)
                    .map(this.extractResult)
                    .catch(this.handleError);
    }


    private extractResult(response : Response) : TrainingMinutes[] {
        let vals : TrainingMinutes[] = [];
        for (var key in response.json()) {
          let data = response.json()[key];
          let val : TrainingMinutes = new TrainingMinutes();
          val.minutes = data;
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
