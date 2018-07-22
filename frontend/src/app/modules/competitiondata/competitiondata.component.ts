import { Component, OnInit, Input }    from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Message } from 'primeng/primeng';

import { CompetitionDataService } from './competitiondata.service';
import { ToolbarDataService } from '../toolbar/toolbardata.service';
import { CompetitionParam, Competition } from './competitiondata';

@Component({
    selector: 'competitiondata',
    templateUrl: './competitiondata.html',
    styleUrls: ['./competitiondata.css']
})
export class CompetitionDataComponent implements OnInit {

  constructor(private competitionDataService : CompetitionDataService, private toolbarDataService : ToolbarDataService) { }

  @Input() messages : Message[] = []

  options: any;
  lineData: any;

  ngOnInit(): void {
    this.toolbarDataService.addEventListener(this);
    this.toolbarDataService.showDateRange = true;
    this.toolbarDataService.showDistance = false;
    this.toolbarDataService.showUser = true;
    this.toolbarDataService.showCompetitionParam = true;
    this.options = {
      responsive: false,
      maintainAspectRatio: true,
      scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'month',
                    displayFormats: {
                        quarter: 'MMM, YY'
                    },
                    min: new Date(2017, 0 , 1),
                    max: new Date(),
                    minUnit: 'day'
                },
                distribution: 'series'
            }],
            yAxes: [{
                ticks: {
                    min: 0
                }
            }]
        }
    };
    this.regenerate();
  }

   regenerate(): void {
     this.competitionDataService
      .getCompetition(this.toolbarDataService.dateRange, this.toolbarDataService.competitionParam.id, this.toolbarDataService.user.id)
      .subscribe(values =>
        {
          let data = [];
          for (var i = 0; i < values.length; i++) {
             data.push({
               t: new Date(values[i].date),
               y: values[i].value
             });
           }
           this.lineData = {
                datasets: [
                    {
                      data: data,
                      label: 'Scores',
                      borderColor: '#ff8888',
                      backgroundColor: 'rgba(0, 0, 0, 0)'
                    }
                ]
            }
            this.options = {
              responsive: false,
              maintainAspectRatio: true,
              scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'month',
                            displayFormats: {
                                quarter: 'MMM, YY'
                            },
                            min: data[0].t,
                            max: data[data.length - 1].t,
                            minUnit: 'month',
                            stepSize: 1
                        },
                        distribution: 'linear'
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0
                        }
                    }]
                }
            };
        },
        (error) =>
        {
          this.messages.push({severity:'error', summary:'Error getting competitionResults.', detail:error});
        });
      }

}
