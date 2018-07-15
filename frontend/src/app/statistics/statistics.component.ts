import { Component, OnInit, Input }    from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { Message } from 'primeng/primeng';

import { StatisticsService } from './statistics.service';
import { Statistics } from './statistics';

@Component({
    templateUrl: './statistics.html',
    styleUrls: ['./statistics.css']
})
export class StatisticsComponent implements OnInit {

  constructor(private statisticsService : StatisticsService) { }

  @Input() messages : Message[] = []

  per16 : any;
  per8 : any;
  per4 : any;
  per2 : any;
  per1 : any;
  options: any;

   ngOnInit(): void {

     this.options = {
           scales: {
              yAxes: [{ticks: {min: 0, max:20}}]
           }
        };
     this.getStatistics();
   }

  getStatistics(): void {
    this.statisticsService
     .getStatistics()
     .subscribe(statistics =>
       {
         this.getPer16(statistics);
         this.getPer8(statistics);
         this.getPer4(statistics);
         this.getPer2(statistics);
         this.getPer1(statistics);
       },
       (error) =>
       {
         this.messages.push({severity:'error', summary:'Error getting statistics.', detail:error});
       });
     }

     getPer16(statistics: Statistics) {
       this.per16 = {
          labels: statistics.labelsPer16,
           datasets: [
               {
                   label: '8 dels finaler (1 poeng)',
                   backgroundColor: '#42A5F5',
                   borderColor: '#1E88E5',
                   data: statistics.dataPer16
               }
           ]
       }
     }

     getPer8(statistics: Statistics) {
       this.per8 = {
         labels: statistics.labelsPer8,
           datasets: [
               {
                   label: 'Kvartfinaler (2 poeng)',
                   backgroundColor: '#42A5F5',
                   borderColor: '#1E88E5',
                   data: statistics.dataPer8
               }
           ]
       }
     }

     getPer4(statistics: Statistics) {
       this.per4 = {
          labels: statistics.labelsPer4,
          datasets: [
               {
                   label: 'Semifinaler (3 poeng)',
                   backgroundColor: '#42A5F5',
                   borderColor: '#1E88E5',
                   data: statistics.dataPer4
               }
           ]
         }
     }

     getPer2(statistics: Statistics) {
       this.per2 = {
         labels: statistics.labelsPer2,
         datasets: [
               {
                   label: 'Finaler (4 poeng)',
                   backgroundColor: '#42A5F5',
                   borderColor: '#1E88E5',
                   data: statistics.dataPer2
               }
           ]
         }
     }

     getPer1(statistics: Statistics) {
       this.per1 = {
           labels: statistics.labelsPer1,
           datasets: [
               {
                   label: 'Vinner (5 poeng)',
                   backgroundColor: '#42A5F5',
                   borderColor: '#1E88E5',
                   data: statistics.dataPer1
               }
           ]
         }
     }
}
