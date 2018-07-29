import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { TotalStatsModule } from '../../data/totalstats/totalstats.module';
import { DiaryModule } from '../../data/diary/diary.module';
import { DiaryLogModule } from '../../data/diarylog/diarylog.module';


// Application components
import { ProfileComponent }    from "./profile.component";

@NgModule({
  imports:      [ RouterModule, TotalStatsModule, DiaryModule ],
  exports:      [ ProfileComponent ],
  declarations: [ ProfileComponent ],
  bootstrap:    [ ],
  providers:    [ ]
})
export class ProfileModule { }
