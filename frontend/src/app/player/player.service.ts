import { Injectable }               from '@angular/core';
import { Http, Headers, RequestOptions, Response }           from '@angular/http';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Player }     from './player';

@Injectable()
export class PlayerService {

    constructor (private http: Http) {}

    getPlayers() : Observable<Player[]> {
        return this.http.get("/wc/request/players")
                    .map(this.extractPlayer)
                    .catch(this.handleError);
    }

    private extractPlayer(response : Response) : Player[] {
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
