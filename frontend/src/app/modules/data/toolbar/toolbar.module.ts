import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }           from '@angular/forms';
import { HttpModule }             from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common'

import { RequestOptions }         from '@angular/http';

import { ToolbarComponent }            from "./toolbar.component";

import { ToolbarService }            from "./toolbar.service";
import { ToolbarDataService }            from "./toolbardata.service";

import { ChartModule, ListboxModule, SharedModule, GrowlModule, DropdownModule, TabViewModule, CalendarModule }    from 'primeng/primeng';

@NgModule({
  imports:      [ BrowserModule, CommonModule, BrowserAnimationsModule, ChartModule, FormsModule, ReactiveFormsModule, HttpModule, GrowlModule, CalendarModule, DropdownModule, SharedModule, TabViewModule ],
  exports:      [ ToolbarComponent ],
  declarations: [ ToolbarComponent ],
  bootstrap:    [ ],
  providers:    [ ToolbarDataService, ToolbarService ]
})
export class ToolbarModule {
  static forRoot() {
    return {
      ngModule: ToolbarModule,
      providers: [
        { provide: ToolbarDataService},{ provide: ToolbarService}
      ]
    };
  }
}
