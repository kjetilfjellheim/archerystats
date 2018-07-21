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
                    unit: 'day',
                    displayFormats: {
                        quarter: 'MMM D'
                    }
                },
                distribution: 'series'
            }],
            yAxes: [{
                ticks: {
                    suggestedMin: 0
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
        },
        (error) =>
        {
          this.messages.push({severity:'error', summary:'Error getting competitionResults.', detail:error});
        });
      }

}
