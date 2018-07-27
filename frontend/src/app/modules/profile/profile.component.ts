import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ComponentFactory }    from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router }                 from '@angular/router';

import { Message } from 'primeng/primeng';

import { TotalStatsComponent } from '../totalstats/totalstats.component';
import { DiaryComponent } from '../diary/diary.component';

@Component({
    templateUrl: './profile.html',
    styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild("competitionsThisYearContainer", { read: ViewContainerRef }) competitionsThisYearContainer : any;
  @ViewChild("trainingAmountContainer", { read: ViewContainerRef }) trainingAmountContainer : any;
  @ViewChild("verticalAccuracyLastTrainingContainer", { read: ViewContainerRef }) verticalAccuracyLastTrainingContainer : any;
  @ViewChild("horizontalAccuracyLastTrainingContainer", { read: ViewContainerRef }) horizontalAccuracyLastTrainingContainer : any;
  @ViewChild("verticalAccuracyAverageYearContainer", { read: ViewContainerRef }) verticalAccuracyAverageYearContainer : any;
  @ViewChild("horizontalAccuracyAverageYearContainer", { read: ViewContainerRef }) horizontalAccuracyAverageYearContainer : any;

  constructor(private resolver: ComponentFactoryResolver, private router: Router) { }

  @Input() messages : Message[] = []

  ngOnInit(): void {
    
    this.getCompetitionsThisYearContainer();
    this.getTrainingAmountPerWeek();
    this.getVerticalAccuracyLastTrainingContainer();
    this.getHorizontalAccuracyLastTrainingContainer();
    this.getVerticalAccuracyAverageYearContainer();
    this.getHorizontalAccuracyAverageYearContainer();
  }

  public getCompetitionsThisYearContainer() {
    this.competitionsThisYearContainer.clear();
  }

  public getTrainingAmountPerWeek() {
    this.trainingAmountContainer.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(DiaryComponent);
    let componentRef: ComponentRef<any> = this.trainingAmountContainer.createComponent(factory);
    let dateRange : Date[] = [new Date((new Date()).getFullYear(), 0, 1), new Date((new Date()).getFullYear(), 11, 31)];
    componentRef.instance.generate(dateRange);
  }

  public getVerticalAccuracyLastTrainingContainer() {
    this.verticalAccuracyLastTrainingContainer.clear();
  }

  public getHorizontalAccuracyLastTrainingContainer() {
    this.horizontalAccuracyLastTrainingContainer.clear();
  }

  public getVerticalAccuracyAverageYearContainer() {
    this.verticalAccuracyAverageYearContainer.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(TotalStatsComponent);
    let verticalAccuracyAverageYearComponentRef: ComponentRef<any> = this.verticalAccuracyAverageYearContainer.createComponent(factory);
    let dateRange : Date[] = [new Date((new Date()).getFullYear(), 0, 1), new Date((new Date()).getFullYear(), 11, 31)];
    verticalAccuracyAverageYearComponentRef.instance.generateVertical(dateRange, 0, 1000);
  }

  public getHorizontalAccuracyAverageYearContainer() {
    this.horizontalAccuracyAverageYearContainer.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(TotalStatsComponent);
    let horizontalAccuracyAverageYearComponentRef: ComponentRef<any> = this.horizontalAccuracyAverageYearContainer.createComponent(factory);
    let dateRange : Date[] = [new Date((new Date()).getFullYear(), 0, 1), new Date((new Date()).getFullYear(), 11, 31)];
    horizontalAccuracyAverageYearComponentRef.instance.generateHorizontal(dateRange, 0, 1000);
  }

}
