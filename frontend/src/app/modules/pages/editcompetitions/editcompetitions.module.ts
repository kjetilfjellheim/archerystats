import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }           from '@angular/forms';
import { HttpModule }             from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// Application components
import { EditCompetitionsComponent }    from "./editcompetitions.component";


@NgModule({
  imports:      [ BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, HttpModule ],
  exports:      [ EditCompetitionsComponent ],
  declarations: [ EditCompetitionsComponent ],
  bootstrap:    [ ],
  providers:    [ ]
})
export class EditCompetitionsModule { }
