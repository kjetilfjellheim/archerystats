import { Injectable }               from '@angular/core';
import { Http, Headers, RequestOptions, Response }           from '@angular/http';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User }     from './user';

@Injectable()
export class UserService {

    constructor (private http: Http) {}

    getUsers() : Observable<User[]> {
        return this.http.get("/archerystats/request/users")
                    .map(this.extractUser)
                    .catch(this.handleError);
    }

    private extractUser(response : Response) : User[] {
        let users : User[] = response.json();
        return users;
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
