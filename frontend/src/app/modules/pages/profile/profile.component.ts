import { Component, OnInit, OnDestroy, Input, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ComponentFactory }    from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { Message } from 'primeng/primeng';

import { TotalStatsComponent } from '../../data/totalstats/totalstats.component';
import { DiaryComponent } from '../../data/diary/diary.component';
import { DiaryLogComponent } from '../../data/diarylog/diarylog.component';

@Component({
    templateUrl: './profile.html',
    styleUrls: ['./profile.css'],
    entryComponents: [ TotalStatsComponent, DiaryComponent, DiaryLogComponent ]
})
export class ProfileComponent implements OnInit, OnDestroy {

  @ViewChild("competitionsThisYearContainer", { read: ViewContainerRef }) competitionsThisYearContainer : any;
  @ViewChild("trainingAmountContainer", { read: ViewContainerRef }) trainingAmountContainer : any;
  @ViewChild("verticalAccuracyLastTrainingContainer", { read: ViewContainerRef }) verticalAccuracyLastTrainingContainer : any;
  @ViewChild("horizontalAccuracyLastTrainingContainer", { read: ViewContainerRef }) horizontalAccuracyLastTrainingContainer : any;
  @ViewChild("verticalAccuracyAverageYearContainer", { read: ViewContainerRef }) verticalAccuracyAverageYearContainer : any;
  @ViewChild("horizontalAccuracyAverageYearContainer", { read: ViewContainerRef }) horizontalAccuracyAverageYearContainer : any;
  @ViewChild("diarylogContainer", { read: ViewContainerRef }) diarylogContainer : any;

  trainingComponentRef: ComponentRef<any>;
  diarylogComponentRef: ComponentRef<any>;
  verticalAccuracyLastTrainingComponentRef: ComponentRef<any>;
  horizontalAccuracyLastTrainingComponentRef: ComponentRef<any>
  verticalAccuracyAverageYearComponentRef: ComponentRef<any>;
  horizontalAccuracyAverageYearComponentRef: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver, private router: Router) { }

  @Input() messages : Message[] = []

  ngOnInit(): void {
    this.getCompetitionsThisYearContainer();
    this.geDiarylogContainer();
    this.getTrainingAmountPerWeek();
    this.getVerticalAccuracyLastTrainingContainer();
    this.getHorizontalAccuracyLastTrainingContainer();
    this.getVerticalAccuracyAverageYearContainer();
    this.getHorizontalAccuracyAverageYearContainer();
  }

  ngOnDestroy(): void {
    if (this.trainingComponentRef) {
      this.trainingComponentRef.destroy();
    }
    if (this.verticalAccuracyLastTrainingComponentRef) {
      this.verticalAccuracyLastTrainingComponentRef.destroy();
    }
    if (this.horizontalAccuracyLastTrainingComponentRef) {
      this.horizontalAccuracyLastTrainingComponentRef.destroy();
    }
    if (this.verticalAccuracyAverageYearComponentRef) {
      this.verticalAccuracyAverageYearComponentRef.destroy();
    }
    if (this.horizontalAccuracyAverageYearComponentRef) {
      this.horizontalAccuracyAverageYearComponentRef.destroy();
    }
    if (this.diarylogComponentRef) {
      this.diarylogComponentRef.destroy();
    }
  }

  public getCompetitionsThisYearContainer() {
    this.competitionsThisYearContainer.clear();
  }

  public geDiarylogContainer() {
    this.diarylogContainer.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(DiaryLogComponent);
    this.diarylogComponentRef = this.diarylogContainer.createComponent(factory);
    let dateRange : Date[] = [new Date((new Date()).getFullYear(), 0, 1), new Date((new Date()).getFullYear(), 11, 31)];
    this.diarylogComponentRef.instance.getMaxEntries(dateRange, 5);
  }

  public getVerticalAccuracyLastTrainingContainer() {
    this.verticalAccuracyLastTrainingContainer.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(TotalStatsComponent);
    this.verticalAccuracyLastTrainingComponentRef = this.verticalAccuracyLastTrainingContainer.createComponent(factory);
    this.verticalAccuracyLastTrainingComponentRef.instance.generateHorizontalLastTraining(0, 1000);
  }

  public getHorizontalAccuracyLastTrainingContainer() {
    this.horizontalAccuracyLastTrainingContainer.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(TotalStatsComponent);
    this.horizontalAccuracyLastTrainingComponentRef = this.horizontalAccuracyLastTrainingContainer.createComponent(factory);
    this.horizontalAccuracyLastTrainingComponentRef.instance.generateHorizontalLastTraining(0, 1000);
  }

  public getTrainingAmountPerWeek() {
    this.trainingAmountContainer.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(DiaryComponent);
    this.trainingComponentRef = this.trainingAmountContainer.createComponent(factory);
    let dateRange : Date[] = [new Date((new Date()).getFullYear(), 0, 1), new Date((new Date()).getFullYear(), 11, 31)];
    this.trainingComponentRef.instance.generate(dateRange);
  }

  public getVerticalAccuracyAverageYearContainer() {
    this.verticalAccuracyAverageYearContainer.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(TotalStatsComponent);
    this.verticalAccuracyAverageYearComponentRef = this.verticalAccuracyAverageYearContainer.createComponent(factory);
    let dateRange : Date[] = [new Date((new Date()).getFullYear(), 0, 1), new Date((new Date()).getFullYear(), 11, 31)];
    this.verticalAccuracyAverageYearComponentRef.instance.generateVertical(dateRange, 0, 1000);
  }

  public getHorizontalAccuracyAverageYearContainer() {
    this.horizontalAccuracyAverageYearContainer.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(TotalStatsComponent);
    this.horizontalAccuracyAverageYearComponentRef = this.horizontalAccuracyAverageYearContainer.createComponent(factory);
    let dateRange : Date[] = [new Date((new Date()).getFullYear(), 0, 1), new Date((new Date()).getFullYear(), 11, 31)];
    this.horizontalAccuracyAverageYearComponentRef.instance.generateHorizontal(dateRange, 0, 1000);
  }



}
