import { Component, OnInit, Input }    from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Message,  } from 'primeng/primeng';

import { DiaryLogService } from './diarylog.service';

import { Diary } from './diarylog';

@Component({
    selector: 'diarylog',
    templateUrl: './diarylog.html',
    styleUrls: ['./diarylog.css']
})
export class DiaryLogComponent {

  constructor(private diaryLogService : DiaryLogService) { }

  @Input() messages : Message[] = []

  diaries: Diary[] = [];

  simple: boolean = true;

  public setSimple(simple: boolean): void {
    this.simple = simple;
  }

  get(dateRange: Date[]): void {
    this.diaryLogService
     .getDiaries(dateRange)
     .subscribe(diaries =>
       {
         this.diaries = diaries;
       },
       (error) =>
       {
         this.messages.push({severity:'error', summary:'Error getting values.', detail:error});
       });
    }

    getMaxEntries(dateRange: Date[], maxentries: number): void {
      this.diaryLogService
       .getDiariesWithMaxEntries(dateRange, maxentries)
       .subscribe(diaries =>
         {
           this.diaries = diaries;
         },
         (error) =>
         {
           this.messages.push({severity:'error', summary:'Error getting values.', detail:error});
         });
      }


}
