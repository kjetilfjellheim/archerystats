import { Component, OnInit, Input }    from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { Message } from 'primeng/primeng';

import { TotalStatsService } from './totalstats.service';
import { UserService } from './user.service';
import { Total } from './totalstats';
import { User } from './user';

@Component({
    selector: 'totalStatsComponent',
    templateUrl: './totalstats.html',
    styleUrls: ['./totalstats.css']
})
export class TotalStatsComponent implements OnInit {

  constructor(private totalStatsService : TotalStatsService, private userService : UserService) { }

  @Input() messages : Message[] = []

  options: any;
  totalHorizontalData: any;
  totalVerticalData: any;
  totalDateRange: Date[] = [];
  totalDistance: number = 5;
  totalUser: User = new User();

  /**
  * Options
  */
  totalDateRangeChoice: Date[] = [];
  totalDistanceChoice: number = 5;
  totalUserChoice : User = new User();

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
    this.totalDateRange.push(new Date(new Date().getFullYear(), 0, 1));
    this.totalDateRange.push(new Date(new Date().getFullYear(), 11, 31));
    this.totalDateRangeChoice.push(new Date(new Date().getFullYear(), 0, 1));
    this.totalDateRangeChoice.push(new Date(new Date().getFullYear(), 11, 31));
    this.options = {
      responsive: false,
      maintainAspectRatio: true
    };
   this.getTotals();
  }

  regenerateTotal() {
    this.totalDateRange[0] = this.totalDateRangeChoice[0];
    this.totalDateRange[1] = this.totalDateRangeChoice[1];
    this.totalDistance = this.totalDistanceChoice;
    this.totalUser = this.totalUserChoice;
    this.getTotals();
  }

getTotals(): void {
  this.totalStatsService
   .getStatisticsTotal(this.totalDateRange, this.totalDistance, this.totalUser.id)
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
