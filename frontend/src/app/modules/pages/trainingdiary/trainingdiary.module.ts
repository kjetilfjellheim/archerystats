import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }           from '@angular/forms';
import { HttpModule }             from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { TrainingDiaryComponent }    from "./trainingdiary.component";
import { ToolbarModule } from '../../data/toolbar/toolbar.module';

@NgModule({
  imports:      [ BrowserModule, ToolbarModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, HttpModule ],
  exports:      [ TrainingDiaryComponent ],
  declarations: [ TrainingDiaryComponent ],
  bootstrap:    [ ],
  providers:    [ ]
})
export class TrainingDiaryModule { }
