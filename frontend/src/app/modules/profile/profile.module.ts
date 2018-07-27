import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';

// Application components
import { ProfileComponent }    from "./profile.component";

@NgModule({
  imports:      [ ],
  exports:      [ ProfileComponent ],
  declarations: [ ProfileComponent ],
  bootstrap:    [ ],
  providers:    [ ProfileComponent ]
})
export class ProfileModule { }
