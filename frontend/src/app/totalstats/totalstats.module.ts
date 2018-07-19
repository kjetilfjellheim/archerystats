import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }           from '@angular/forms';
import { HttpModule }             from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { RequestOptions }         from '@angular/http';

// Application components
import { TotalStatsComponent }    from "./totalstats.component";
import { TotalStatsService }      from "./totalstats.service";
import { UserService }            from "./user.service";

import { ChartModule, ListboxModule, SharedModule, GrowlModule, DropdownModule, TabViewModule, CalendarModule }    from 'primeng/primeng';

@NgModule({
  imports:      [ BrowserModule, BrowserAnimationsModule, ChartModule, FormsModule, ReactiveFormsModule, HttpModule, GrowlModule, CalendarModule, DropdownModule, SharedModule, TabViewModule ],
  exports:      [ TotalStatsComponent ],
  declarations: [ TotalStatsComponent ],
  bootstrap:    [ ],
  providers:    [ TotalStatsService, UserService ]
})
export class TotalStatsModule { }
