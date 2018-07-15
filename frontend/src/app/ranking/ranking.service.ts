import { Injectable }               from '@angular/core';
import { Http, Headers, RequestOptions, Response }           from '@angular/http';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Ranking }     from './ranking';

@Injectable()
export class RankingService {

    constructor (private http: Http) {}

    getRanking() : Observable<Ranking[]> {
        return this.http.get("/wc/request/ranking")
                    .map(this.extractRanking)
                    .catch(this.handleError);
    }

    private extractRanking(response : Response) : Ranking[] {
      return response.json();
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
