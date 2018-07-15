import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }          from '@angular/forms';
import { RouterModule, RouteReuseStrategy }         from '@angular/router';
import { HttpModule }           from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { RequestOptions } from '@angular/http';

import { CustomRequestOptions } from './common/cache-remover';

// Application components
import { BreadcrumbComponent }      from "./breadcrumb/breadcrumb.component";
import { HomeComponent }            from "./home/home.component";
import { PlayerComponent }            from "./player/player.component";
import { PlayerService }            from "./player/player.service";
import { RankingComponent }            from "./ranking/ranking.component";
import { RankingService }            from "./ranking/ranking.service";
import { StatisticsComponent }            from "./statistics/statistics.component";
import { StatisticsService }            from "./statistics/statistics.service";
import { ScoringComponent }            from "./scoring/scoring.component";

import { ChartModule, ListboxModule } from 'primeng/primeng';

// Providers

import { APP_ROUTES }                       from './app.routes';

import { DataTableModule, SharedModule, MultiSelectModule, DialogModule, GrowlModule, CheckboxModule, DropdownModule, TooltipModule, ButtonModule, TriStateCheckboxModule, TabViewModule, CalendarModule }    from 'primeng/primeng';

import { CustomReuseStrategy } from './strategies/CustomReuseStrategy';

@NgModule({
  imports:      [ BrowserModule, ListboxModule, BrowserAnimationsModule, ChartModule, FormsModule, ReactiveFormsModule, HttpModule, DataTableModule, DialogModule, GrowlModule, CalendarModule, CheckboxModule, DropdownModule, TriStateCheckboxModule, MultiSelectModule, SharedModule, TooltipModule, ButtonModule, TabViewModule, RouterModule.forRoot(APP_ROUTES) ],
  exports:      [ RouterModule],
  declarations: [ HomeComponent, BreadcrumbComponent, RankingComponent, StatisticsComponent, ScoringComponent, PlayerComponent ],
  bootstrap:    [ HomeComponent ],
  providers:    [ { provide: RequestOptions, useClass: CustomRequestOptions }, PlayerService, RankingService, StatisticsService,  { provide: RouteReuseStrategy, useClass: CustomReuseStrategy } ]
})
export class AppModule { }
