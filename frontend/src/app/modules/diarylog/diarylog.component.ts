import { Component, OnInit, Input }    from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { Message,  } from 'primeng/primeng';

import { ToolbarDataService } from '../toolbar/toolbardata.service';
import { DiaryLogService } from './diarylog.service';

import { Diary } from './diarylog';

@Component({
    selector: 'diarylog',
    templateUrl: './diarylog.html',
    styleUrls: ['./diarylog.css']
})
export class DiaryLogComponent implements OnInit {

  constructor(private diaryLogService : DiaryLogService, private toolbarDataService : ToolbarDataService) { }

  @Input() messages : Message[] = []

  diaries: Diary[] = [];

  ngOnInit(): void {
    this.toolbarDataService.addEventListener(this);
    this.toolbarDataService.showDateRange = true;
    this.toolbarDataService.showDistance = false;
    this.toolbarDataService.showUser = true;
    this.toolbarDataService.showCompetitionParam = false;
    this.regenerate();
  }

regenerate(): void {
  this.diaryLogService
   .getDiaries(this.toolbarDataService.dateRange, this.toolbarDataService.user.id)
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
