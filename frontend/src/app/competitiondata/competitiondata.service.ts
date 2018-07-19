import { Injectable }               from '@angular/core';
import { Http, Headers, RequestOptions, Response }           from '@angular/http';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Competition, CompetitionParam }     from './competitiondata';

@Injectable()
export class CompetitionDataService {

    constructor (private http: Http) {}

    getCompetition(dateRange: Date[], param: string, user: string) : Observable<Competition[]> {
        return this.http.get("/request/competitions/results/competition?idUser=" + user + "&idParam=" + param + "&fromDate=" + dateRange[0].toISOString().substring(0, 10) + "&toDate=" + dateRange[1].toISOString().substring(0, 10))
                    .map(this.extractCompetition)
                    .catch(this.handleError);
    }

    getTraining(dateRange: Date[], param: string, user: string) : Observable<Competition[]> {
        return this.http.get("/request/competitions/results/training?idUser=" + user + "&idParam=" + param + "&fromDate=" + dateRange[0].toISOString().substring(0, 10) + "&toDate=" + dateRange[1].toISOString().substring(0, 10))
                    .map(this.extractCompetition)
                    .catch(this.handleError);
    }

    getCompetitionParam() : Observable<CompetitionParam[]> {
        return this.http.get("/archerystats/request/competitions/params")
                    .map(this.extractCompetitionParam)
                    .catch(this.handleError);
    }

    private extractCompetition(response : Response) : Competition[] {
        let vals : Competition[] = response.json();
        for (var row in vals) {
          //row.date = new Date(row.date);
        }
        return vals;
    }

    private extractCompetitionParam(response : Response) : CompetitionParam[] {
        let vals : CompetitionParam[] = response.json();
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
