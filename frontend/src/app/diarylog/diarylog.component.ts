import { Component, OnInit, Input }    from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { Message,  } from 'primeng/primeng';

import { DiaryLogService } from './diarylog.service';
import { UserService } from './user.service';
import { Diary } from './diarylog';
import { User } from './user';

@Component({
    selector: 'diarylog',
    templateUrl: './diarylog.html',
    styleUrls: ['./diarylog.css']
})
export class DiaryLogComponent implements OnInit {

  constructor(private diaryLogService : DiaryLogService, private userService : UserService) { }

  @Input() messages : Message[] = []

  dateRange: Date[] = [];
  user: User = new User();
  diaries: Diary[] = [];
  /**
  * Options
  */
  dateRangeChoice: Date[] = [];
  userChoice : User = new User();
  users: any[] = [];

  ngOnInit(): void {
    this.userService
       .getUsers()
       .subscribe(users =>
         {
           this.users = users;
         },
         (error) =>
         {
           this.messages.push({severity:'error', summary:'Error getting users.', detail:error});
         });
    this.dateRange.push(new Date(new Date().getFullYear(), 0, 1));
    this.dateRange.push(new Date(new Date().getFullYear(), 11, 31));
    this.dateRangeChoice.push(new Date(new Date().getFullYear(), 0, 1));
    this.dateRangeChoice.push(new Date(new Date().getFullYear(), 11, 31));
    this.getValues();
  }

  regenerate() {
    this.dateRange[0] = this.dateRangeChoice[0];
    this.dateRange[1] = this.dateRangeChoice[1];
    this.user = this.userChoice;
    this.getValues();
  }

getValues(): void {
  this.diaryLogService
   .getDiaries(this.dateRange, this.user.id)
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
