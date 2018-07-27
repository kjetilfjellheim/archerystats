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
import { ProfileModule } from './modules/profile/profile.module';

import { SigninService } from './signin/signin.service';
import { MainComponent }     from "./main/main.component";


import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from "angular5-social-login";

@NgModule({
  imports:      [ BrowserModule, ProfileModule, SocialLoginModule, ToolbarModule, CompetitionDataModule, DiaryLogModule, DiaryModule, OvertimeStatsModule, TotalStatsModule, ListboxModule, BrowserAnimationsModule, ChartModule, FormsModule, ReactiveFormsModule, HttpModule, DataTableModule, DialogModule, GrowlModule, CalendarModule, CheckboxModule, DropdownModule, TriStateCheckboxModule, MultiSelectModule, SharedModule, TooltipModule, ButtonModule, TabViewModule, RouterModule.forRoot(APP_ROUTES) ],
  exports:      [ RouterModule],
  declarations: [ HomeComponent, BreadcrumbComponent, MainComponent ],
  bootstrap:    [ HomeComponent ],
  providers:    [ SigninService, { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs },{ provide: RequestOptions, useClass: CustomRequestOptions }]
})
export class AppModule { }


export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("962706627245575")
        },
      ]
  );
  return config;
}
