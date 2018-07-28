import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ComponentFactory }    from '@angular/core';

import { ToolbarDataService } from '../../data/toolbar/toolbardata.service';

import { TotalStatsComponent } from '../../data/totalstats/totalstats.component';
import { OvertimeStatsComponent } from '../../data/overtimestats/overtimestats.component';

@Component({
    templateUrl: './trainingaxis.html',
    styleUrls: ['./trainingaxis.css'],
    entryComponents: [ TotalStatsComponent, OvertimeStatsComponent ]
})
export class TrainingAxisComponent implements OnInit {

  @ViewChild("axisAccuracyContainer", { read: ViewContainerRef }) axisAccuracyContainer : any;
  @ViewChild("axisAccuracyHorizontalContainer", { read: ViewContainerRef }) axisAccuracyHorizontalContainer : any;
  @ViewChild("axisAccuracyVerticalContainer", { read: ViewContainerRef }) axisAccuracyVerticalContainer : any;
  verticalAccuracyComponentRef: ComponentRef<any>;
  horizontalAccuracyComponentRef: ComponentRef<any>;
  accuracyComponentRef: ComponentRef<any>;
  constructor(private resolver: ComponentFactoryResolver ,private toolbarDataService : ToolbarDataService) {}

  ngOnInit(): void {
    this.toolbarDataService.showDateRange = true;
    this.toolbarDataService.showDistance = true;
    this.toolbarDataService.showCompetitionParam = false;
    this.toolbarDataService.addEventListener(this);
    this.initOvertimeContainer();
    this.initVerticalAccuracyContainer();
    this.initHorizontalAccuracyContainer();
    this.regenerate();
  }

  public regenerate() {
    this.updateVerticalAccuracy();
    this.updateHorizontalAccuracy();
    this.updateOvertimeAccuracy();
  }

  updateVerticalAccuracy() {
    this.verticalAccuracyComponentRef.instance.generateVertical(this.toolbarDataService.dateRange, this.toolbarDataService.minDistance, this.toolbarDataService.maxDistance);
  }
  updateHorizontalAccuracy() {
    this.horizontalAccuracyComponentRef.instance.generateHorizontal(this.toolbarDataService.dateRange, this.toolbarDataService.minDistance, this.toolbarDataService.maxDistance);
  }
  updateOvertimeAccuracy() {
    this.accuracyComponentRef.instance.generate(this.toolbarDataService.dateRange, this.toolbarDataService.minDistance, this.toolbarDataService.maxDistance);
  }

  public initOvertimeContainer() {
    this.axisAccuracyContainer.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(OvertimeStatsComponent);
    this.accuracyComponentRef = this.axisAccuracyContainer.createComponent(factory);
  }

  public initVerticalAccuracyContainer() {
    this.axisAccuracyVerticalContainer.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(TotalStatsComponent);
    this.verticalAccuracyComponentRef = this.axisAccuracyVerticalContainer.createComponent(factory);
  }

  public initHorizontalAccuracyContainer() {
    this.axisAccuracyHorizontalContainer.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(TotalStatsComponent);
    this.horizontalAccuracyComponentRef = this.axisAccuracyHorizontalContainer.createComponent(factory);
  }

}
