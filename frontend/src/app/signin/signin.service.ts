import { Injectable }               from '@angular/core';
import { Http, Headers, RequestOptions, Response }           from '@angular/http';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Profile } from './profile';

@Injectable()
export class SigninService {

    constructor (private http: Http) {}

    login(data: any) : Observable<any> {
        return this.http.post("/archerystats/request/facebook/login", data)
                    .map(this.extractLogin)
                    .catch(this.handleError);
    }

    isLoggedIn() : Observable<boolean> {
      return this.http.get("/archerystats/request/isloggedin")
                  .map(this.extractIsLogin)
                  .catch(this.handleError);
    }

    logout() : Observable<void> {
      return this.http.get("/archerystats/request/logout")
                  .catch(this.handleError);
    }

    getProfile() : Observable<Profile> {
      return this.http.get("/archerystats/request/profile")
                  .map(this.extractProfile)
                  .catch(this.handleError);
    }

    private extractProfile(response : Response) : Profile {
      return response.json();
    }

    private extractLogin(response : Response) : any {
      return response.json();
    }

    private extractIsLogin(response : Response) : boolean {
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
