import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }           from '@angular/forms';
import { HttpModule }             from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// Application components
import { EditTrainingLogComponent }    from "./edittraininglog.component";


@NgModule({
  imports:      [ BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, HttpModule ],
  exports:      [ EditTrainingLogComponent ],
  declarations: [ EditTrainingLogComponent ],
  bootstrap:    [ ],
  providers:    [ ]
})
export class EditTrainingLogModule { }
