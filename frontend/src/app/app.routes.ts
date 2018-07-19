import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';

// Application components
import { StatisticsComponent }     from "./statistics/statistics.component";
import { DiaryinfoComponent }     from "./diaryinfo/diaryinfo.component";
import { CompetitionComponent }     from "./competition/competition.component";


export const APP_ROUTES : Routes = [
    { path: '', redirectTo: '/statistics', pathMatch: 'full' },
    { path: 'statistics', component: StatisticsComponent, data: { cachable: false } },
    { path: 'diary', component: DiaryinfoComponent, data: { cachable: false } },
    { path: 'competitions', component: CompetitionComponent, data: { cachable: false } }
];
