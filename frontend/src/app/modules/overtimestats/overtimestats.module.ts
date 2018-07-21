import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }           from '@angular/forms';
import { HttpModule }             from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { RequestOptions }         from '@angular/http';

// Application components
import { OvertimeStatsComponent }    from "./overtimestats.component";
import { OvertimeStatsService }      from "./overtimestats.service";

import { ChartModule, ListboxModule, SharedModule, GrowlModule, DropdownModule, TabViewModule, CalendarModule }    from 'primeng/primeng';
import { ToolbarModule } from '../toolbar/toolbar.module';

@NgModule({
  imports:      [ BrowserModule, ToolbarModule, BrowserAnimationsModule, ChartModule, FormsModule, ReactiveFormsModule, HttpModule, GrowlModule, CalendarModule, DropdownModule, SharedModule, TabViewModule ],
  exports:      [ OvertimeStatsComponent ],
  declarations: [ OvertimeStatsComponent ],
  bootstrap:    [ ],
  providers:    [ OvertimeStatsService ]
})
export class OvertimeStatsModule { }
