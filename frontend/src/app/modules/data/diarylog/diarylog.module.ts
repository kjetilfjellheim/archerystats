import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }           from '@angular/forms';
import { HttpModule }             from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { RequestOptions }         from '@angular/http';

// Application components
import { DiaryLogComponent }    from "./diarylog.component";
import { DiaryLogService }      from "./diarylog.service";

import { ChartModule, DataTableModule, ListboxModule, SharedModule, GrowlModule, DropdownModule, TabViewModule, CalendarModule }    from 'primeng/primeng';

@NgModule({
  imports:      [ BrowserModule, DataTableModule, BrowserAnimationsModule, ChartModule, FormsModule, ReactiveFormsModule, HttpModule, GrowlModule, CalendarModule, DropdownModule, SharedModule, TabViewModule ],
  exports:      [ DiaryLogComponent ],
  declarations: [ DiaryLogComponent ],
  bootstrap:    [ ],
  providers:    [ DiaryLogService ]
})
export class DiaryLogModule { }
