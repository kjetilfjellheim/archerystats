import { Injectable }               from '@angular/core';
import { Http, Headers, RequestOptions, Response }           from '@angular/http';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { CompetitionParam }     from './toolbar';

@Injectable()
export class ToolbarService {

    constructor (private http: Http) {}

    getCompetitionParam() : Observable<CompetitionParam[]> {
        return this.http.get("/archerystats/request/competitions/params")
                    .map(this.extractCompetitionParam)
                    .catch(this.handleError);
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
