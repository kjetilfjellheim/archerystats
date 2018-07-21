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


import { APP_ROUTES }             from './app.routes';

import { ChartModule, ListboxModule, DataTableModule, SharedModule, MultiSelectModule, DialogModule, GrowlModule, CheckboxModule, DropdownModule, TooltipModule, ButtonModule, TriStateCheckboxModule, TabViewModule, CalendarModule }    from 'primeng/primeng';

import { CustomReuseStrategy } from './strategies/CustomReuseStrategy';

import { TotalStatsModule } from './modules/totalstats/totalstats.module';
import { OvertimeStatsModule } from './modules/overtimestats/overtimestats.module';
import { DiaryModule } from './modules/diary/diary.module';
import { DiaryLogModule } from './modules/diarylog/diarylog.module';
import { CompetitionDataModule } from './modules/competitiondata/competitiondata.module';
import { ToolbarModule } from './modules/toolbar/toolbar.module';


@NgModule({
  imports:      [ BrowserModule, ToolbarModule, CompetitionDataModule, DiaryLogModule, DiaryModule, OvertimeStatsModule, TotalStatsModule, ListboxModule, BrowserAnimationsModule, ChartModule, FormsModule, ReactiveFormsModule, HttpModule, DataTableModule, DialogModule, GrowlModule, CalendarModule, CheckboxModule, DropdownModule, TriStateCheckboxModule, MultiSelectModule, SharedModule, TooltipModule, ButtonModule, TabViewModule, RouterModule.forRoot(APP_ROUTES) ],
  exports:      [ RouterModule],
  declarations: [ HomeComponent, BreadcrumbComponent ],
  bootstrap:    [ HomeComponent ],
  providers:    [ { provide: RequestOptions, useClass: CustomRequestOptions },  { provide: RouteReuseStrategy, useClass: CustomReuseStrategy } ]
})
export class AppModule { }
