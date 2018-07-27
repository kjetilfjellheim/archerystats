import { Component, OnInit }    from '@angular/core';
import { SigninService } from '../signin/signin.service';
import { AuthService, FacebookLoginProvider } from 'angular5-social-login';
import { Router }                 from '@angular/router';

@Component({
    selector: 'homeComponent',
    templateUrl: './home.html',
    styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  isloggedin : boolean = false;
  name: string;
  constructor(private signinService: SigninService, private socialAuthService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkIsLoggedIn();
    this.getProfile();
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.signinService
         .login(userData)
         .subscribe(
           response =>
           {
             this.checkIsLoggedIn();
             this.getProfile();
             this.router.navigate(['/profile']);
           },
           err =>
           {
             this.checkIsLoggedIn();
           }
          );
         }
    );
  }

  public logout() {
    this.signinService
     .logout()
     .subscribe(
       response =>
       {
         this.checkIsLoggedIn();
         this.router.navigate(['/main']);
       },
       err =>
       {
         this.isloggedin = false;
       });
  }

  public checkIsLoggedIn() {
    this.signinService
     .isLoggedIn()
     .subscribe(
       response =>
       {
         this.isloggedin = response;
       },
       err =>
       {
         this.isloggedin = false;
       });
  }

  public getProfile() {
    this.signinService
     .getProfile()
     .subscribe(
       response =>
       {
         this.name = response.name;
       },
       err =>
       {
         this.isloggedin = false;
       });
  }

}
