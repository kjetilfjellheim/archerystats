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

import { OvertimeStatsModule } from './modules/data/overtimestats/overtimestats.module';
import { DiaryModule } from './modules/data/diary/diary.module';
import { DiaryLogModule } from './modules/data/diarylog/diarylog.module';
import { CompetitionDataModule } from './modules/data/competitiondata/competitiondata.module';
import { ToolbarModule } from './modules/data/toolbar/toolbar.module';
import { SigninService } from './signin/signin.service';

import { MainModule }     from "./modules/pages/main/main.module";
import { ProfileModule } from './modules/pages/profile/profile.module';
import { TrainingDiaryModule } from './modules/pages/trainingdiary/trainingdiary.module';
import { TrainingAxisModule } from './modules/pages/trainingaxis/trainingaxis.module';
import { CompetitionsModule } from './modules/pages/competitions/competitions.module';
import { EditCompetitionsModule } from './modules/pages/editcompetitions/editcompetitions.module';
import { EditTrainingLogModule } from './modules/pages/edittraininglog/edittraininglog.module';
import { EditTrainingShootModule } from './modules/pages/edittrainingshoot/edittrainingshoot.module';

import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from "angular5-social-login";

@NgModule({
  imports:      [ BrowserModule, EditTrainingShootModule, EditTrainingLogModule, EditCompetitionsModule, CompetitionsModule, TrainingAxisModule, TrainingDiaryModule, MainModule, ProfileModule, SocialLoginModule, ToolbarModule, CompetitionDataModule, DiaryLogModule, DiaryModule, OvertimeStatsModule, ListboxModule, BrowserAnimationsModule, ChartModule, FormsModule, ReactiveFormsModule, HttpModule, DataTableModule, DialogModule, GrowlModule, CalendarModule, CheckboxModule, DropdownModule, TriStateCheckboxModule, MultiSelectModule, SharedModule, TooltipModule, ButtonModule, TabViewModule, RouterModule.forRoot(APP_ROUTES) ],
  exports:      [ RouterModule],
  declarations: [ HomeComponent, BreadcrumbComponent ],
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
