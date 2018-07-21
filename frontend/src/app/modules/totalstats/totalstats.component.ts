import { Component, OnInit, Input }    from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { Message } from 'primeng/primeng';

import { ToolbarDataService } from '../toolbar/toolbardata.service';
import { TotalStatsService } from './totalstats.service';
import { UserService } from './user.service';
import { Total } from './totalstats';
import { User } from './user';

@Component({
    selector: 'totalstats',
    templateUrl: './totalstats.html',
    styleUrls: ['./totalstats.css']
})
export class TotalStatsComponent implements OnInit {

  constructor(private totalStatsService : TotalStatsService, private toolbarDataService : ToolbarDataService) { }

  @Input() messages : Message[] = []

  options: any;
  totalHorizontalData: any;
  totalVerticalData: any;

  ngOnInit(): void {
    this.toolbarDataService.addEventListener(this);
    this.toolbarDataService.showDateRange = true;
    this.toolbarDataService.showDistance = true;
    this.toolbarDataService.showUser = true;
    this.toolbarDataService.showCompetitionParam = false;
    this.options = {
      responsive: false,
      maintainAspectRatio: true
    };
    this.regenerate();
  }

regenerate(): void {
  this.totalStatsService
   .getStatisticsTotal(this.toolbarDataService.dateRange, this.toolbarDataService.distance, this.toolbarDataService.user.id)
   .subscribe(total =>
     {
       let verticalData = [];
       verticalData.push(total.percentHigh);
       verticalData.push(total.percentVerticalCenter);
       verticalData.push(total.percentLow);
       this.totalVerticalData = {
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

       let horizontalData = [];
       horizontalData.push(total.percentLeft);
       horizontalData.push(total.percentHorizontalCenter);
       horizontalData.push(total.percentRight);
       this.totalHorizontalData = {
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
     },
     (error) =>
     {
       this.messages.push({severity:'error', summary:'Error getting totals.', detail:error});
     });
   }

}
