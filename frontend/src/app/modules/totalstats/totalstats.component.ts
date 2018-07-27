import { Component, Input }    from '@angular/core';
import { Observable} from 'rxjs/Rx';

import { TotalStatsService } from './totalstats.service';

@Component({
    templateUrl: './totalstats.html',
    styleUrls: ['./totalstats.css']
})
export class TotalStatsComponent {

  constructor(private totalStatsService : TotalStatsService) { }

  options: any = {
    responsive: false,
    maintainAspectRatio: true
  };
  data: any;

generateVertical(dateRange: Date[], mindistance: number, maxdistance: number): void {
  this.totalStatsService
   .getStatisticsVerticalTotal(dateRange, mindistance, maxdistance)
   .subscribe(total =>
     {
       let verticalData = [];
       verticalData.push(total.percentHigh);
       verticalData.push(total.percentCenter);
       verticalData.push(total.percentLow);
       this.data = {
            labels: ['High', 'Center', 'Low'],
            datasets: [
                {
                  data: verticalData,
                  backgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56"
                  ],
                  hoverBackgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56"
                  ]
                }
            ]
        }
     });
   }

   generateHorizontal(dateRange: Date[], mindistance: number, maxdistance: number): void {
     this.totalStatsService
      .getStatisticsHorizontalTotal(dateRange, mindistance, maxdistance)
      .subscribe(total =>
        {
          let horizontalData = [];
          horizontalData.push(total.percentLeft);
          horizontalData.push(total.percentCenter);
          horizontalData.push(total.percentRight);
          this.data = {
               labels: ['Left', 'Center', 'Right'],
               datasets: [
                   {
                     data: horizontalData,
                     backgroundColor: [
                         "#FF6384",
                         "#36A2EB",
                         "#FFCE56"
                     ],
                     hoverBackgroundColor: [
                         "#FF6384",
                         "#36A2EB",
                         "#FFCE56"
                     ]
                   }
               ]
           }
        });
      }

}
