import { Component, OnInit, AfterViewInit, Input }    from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { PlayerService } from './player.service';

import { Message } from 'primeng/primeng';
import { Player } from './player';

@Component({
    templateUrl: './player.html',
    styleUrls: ['./player.css']
})
export class PlayerComponent implements OnInit {

  selectedPlayer: Player = new Player();
  players: any = [];

  @Input() messages : Message[] = [];

  constructor(private playerService : PlayerService) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService
     .getPlayers()
     .subscribe(players =>
       {
         let data : any = [];
         for (let val of players) {
           let map: any = {};
           map["label"]=val["name"];
           map["value"]=val;
           data.push(map);
         }
         this.players = data;
       },
       (error) =>
       {
         this.messages.push({severity:'error', summary:'Error getting players.', detail:error});
       });
     }

     getKeys(map: any) {
      let array: any = [];
      if (map !== undefined) {
        array = Object.keys(map);
      }
      return array;
     }

}
