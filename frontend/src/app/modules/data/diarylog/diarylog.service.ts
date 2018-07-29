import { Injectable }               from '@angular/core';
import { Http, Headers, RequestOptions, Response }           from '@angular/http';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Diary }     from './diarylog';

@Injectable()
export class DiaryLogService {

    constructor (private http: Http) {}

    getDiaries(dateRange: Date[]) : Observable<Diary[]> {
        return this.http.get("/archerystats/request/diary/log?fromDate=" + dateRange[0].toISOString().substring(0, 10) + "&toDate=" + dateRange[1].toISOString().substring(0, 10))
                    .map(this.extractResult)
                    .catch(this.handleError);
    }

    getDiariesWithMaxEntries(dateRange: Date[], maxentries: number) : Observable<Diary[]> {
        return this.http.get("/archerystats/request/diary/log?maxentries=" + maxentries + "&fromDate=" + dateRange[0].toISOString().substring(0, 10) + "&toDate=" + dateRange[1].toISOString().substring(0, 10))
                    .map(this.extractResult)
                    .catch(this.handleError);
    }

    private extractResult(response : Response) : Diary[] {
        let vals : Diary[] = response.json();
        vals.forEach(function(e) {
          e.date = new Date(e.date);
        });
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
