import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }           from '@angular/forms';
import { RouterModule, RouteReuseStrategy }           from '@angular/router';
import { HttpModule }             from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { RequestOptions }         from '@angular/http';

import { CustomRequestOptions }   from './common/cache-remover';

// Application components
import { BreadcrumbComponent }    from "./breadcrumb/breadcrumb.component";
import { HomeComponent }          from "./home/home.component";
import { StatisticsComponent }    from "./statistics/statistics.component";
import { StatisticsService }      from "./statistics/statistics.service";
import { UserService }            from "./statistics/user.service";


import { ChartModule, ListboxModule } from 'primeng/primeng';

// Providers

import { APP_ROUTES }             from './app.routes';

import { DataTableModule, SharedModule, MultiSelectModule, DialogModule, GrowlModule, CheckboxModule, DropdownModule, TooltipModule, ButtonModule, TriStateCheckboxModule, TabViewModule, CalendarModule }    from 'primeng/primeng';

import { CustomReuseStrategy } from './strategies/CustomReuseStrategy';

@NgModule({
  imports:      [ BrowserModule, ListboxModule, BrowserAnimationsModule, ChartModule, FormsModule, ReactiveFormsModule, HttpModule, DataTableModule, DialogModule, GrowlModule, CalendarModule, CheckboxModule, DropdownModule, TriStateCheckboxModule, MultiSelectModule, SharedModule, TooltipModule, ButtonModule, TabViewModule, RouterModule.forRoot(APP_ROUTES) ],
  exports:      [ RouterModule],
  declarations: [ HomeComponent, BreadcrumbComponent, StatisticsComponent ],
  bootstrap:    [ HomeComponent ],
  providers:    [ { provide: RequestOptions, useClass: CustomRequestOptions }, StatisticsService, UserService,  { provide: RouteReuseStrategy, useClass: CustomReuseStrategy } ]
})
export class AppModule { }
