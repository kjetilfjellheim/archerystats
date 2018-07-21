import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }           from '@angular/forms';
import { HttpModule }             from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { RequestOptions }         from '@angular/http';

// Application components
import { CompetitionDataComponent }    from "./competitiondata.component";
import { CompetitionDataService }      from "./competitiondata.service";

import { ChartModule, ListboxModule, SharedModule, GrowlModule, DropdownModule, TabViewModule, CalendarModule }    from 'primeng/primeng';
import { ToolbarModule } from '../toolbar/toolbar.module';

@NgModule({
  imports:      [ BrowserModule, ToolbarModule, BrowserAnimationsModule, ChartModule, FormsModule, ReactiveFormsModule, HttpModule, GrowlModule, CalendarModule, DropdownModule, SharedModule, TabViewModule ],
  exports:      [ CompetitionDataComponent ],
  declarations: [ CompetitionDataComponent ],
  bootstrap:    [ ],
  providers:    [ CompetitionDataService ]
})
export class CompetitionDataModule { }
