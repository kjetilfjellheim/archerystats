import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';

// Application components
import { TotalStatsComponent }     from "./modules/totalstats/totalstats.component";
import { DiaryComponent }     from "./modules/diary/diary.component";
import { CompetitionDataComponent }     from "./modules/competitiondata/competitiondata.component";
import { DiaryLogComponent }     from "./modules/diarylog/diarylog.component";
import { OvertimeStatsComponent }     from "./modules/overtimestats/overtimestats.component";

export const APP_ROUTES : Routes = [
    { path: '', redirectTo: '/totals', pathMatch: 'full' },
    { path: 'totals', component: TotalStatsComponent, data: { cachable: false } },
    { path: 'training', component: DiaryComponent, data: { cachable: false } },
    { path: 'diarylog', component: DiaryLogComponent, data: { cachable: false } },
    { path: 'competitions', component: CompetitionDataComponent, data: { cachable: false } },
    { path: 'overtimestatats', component: OvertimeStatsComponent, data: { cachable: false } }
];
