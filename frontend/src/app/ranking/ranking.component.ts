import { Component, OnInit, AfterViewInit, Input }    from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { RankingService } from './ranking.service';
import { Ranking } from './ranking';

import { Message } from 'primeng/primeng';


@Component({
    templateUrl: './ranking.html',
    styleUrls: ['./ranking.css']
})
export class RankingComponent implements OnInit {

  constructor(private rankingService : RankingService) { }

  @Input() messages : Message[] = []

  ranking: Ranking[];

  ngOnInit(): void {
    this.getRanking();
  }
  getRanking(): void {
    this.rankingService
     .getRanking()
     .subscribe(ranking =>
       {
         this.ranking = ranking;
       },
       (error) =>
       {
         this.messages.push({severity:'error', summary:'Error getting ranking.', detail:error});
       });
     }

     lookupRowStyleClass(ranking: Ranking): string {
       if (ranking.rank == 1) {
         return "firstplace";
       } else if (ranking.rank == 2) {
         return "secondplace";
       } else if (ranking.rank == 3) {
         return "thirdplace";
       } else {
         return "";
       }
     }
}
