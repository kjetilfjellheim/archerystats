import { Component, OnInit, OnDestroy, Input, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ComponentFactory }    from '@angular/core';

import { ToolbarDataService } from '../../data/toolbar/toolbardata.service';

import { DiaryLogComponent } from '../../data/diarylog/diarylog.component';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { Message } from 'primeng/primeng';

@Component({
    templateUrl: './trainingdiary.html',
    styleUrls: ['./trainingdiary.css'],
    entryComponents: [ DiaryLogComponent ]
})
export class TrainingDiaryComponent implements OnInit, OnDestroy {

  @ViewChild("diarylogContainer", { read: ViewContainerRef }) diarylogContainer : any;
  diarylogComponentRef: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver, private router: Router, private toolbarDataService : ToolbarDataService) { }

  ngOnInit(): void {
    this.toolbarDataService.showDateRange = true;
    this.toolbarDataService.showDistance = false;
    this.toolbarDataService.showCompetitionParam = false;
    this.toolbarDataService.addEventListener(this);    
    this.geDiarylogContainer();
  }

  ngOnDestroy(): void {
    if (this.diarylogComponentRef) {
      this.diarylogComponentRef.destroy();
    }
    if (this.toolbarDataService) {
      this.toolbarDataService.removeEventListener(this);
    }
  }

  public geDiarylogContainer() {
    this.diarylogContainer.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(DiaryLogComponent);
    this.diarylogComponentRef = this.diarylogContainer.createComponent(factory);
    let dateRange : Date[] = [new Date((new Date()).getFullYear(), 0, 1), new Date((new Date()).getFullYear(), 11, 31)];
    this.diarylogComponentRef.instance.setSimple(false);
    this.diarylogComponentRef.instance.get(dateRange);
  }

}
