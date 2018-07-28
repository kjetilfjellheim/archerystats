import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }           from '@angular/forms';
import { HttpModule }             from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// Application components
import { TrainingAxisComponent }    from "./trainingaxis.component";
import { OvertimeStatsModule } from '../../data/overtimestats/overtimestats.module';
import { ToolbarModule } from '../../data/toolbar/toolbar.module';
import { TotalStatsModule } from '../../data/totalstats/totalstats.module';

@NgModule({
  imports:      [ BrowserModule, TotalStatsModule, OvertimeStatsModule, ToolbarModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, HttpModule ],
  exports:      [ TrainingAxisComponent ],
  declarations: [ TrainingAxisComponent ],
  bootstrap:    [ ],
  providers:    [ ]
})
export class TrainingAxisModule { }
