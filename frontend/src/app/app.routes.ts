import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';

// Application components
import { TotalStatsComponent }     from "./modules/data/totalstats/totalstats.component";
import { DiaryComponent }     from "./modules/data/diary/diary.component";
import { CompetitionDataComponent }     from "./modules/data/competitiondata/competitiondata.component";
import { DiaryLogComponent }     from "./modules/data/diarylog/diarylog.component";
import { OvertimeStatsComponent }     from "./modules/data/overtimestats/overtimestats.component";

import { MainComponent }     from "./modules/pages/main/main.component";
import { ProfileComponent }     from "./modules/pages/profile/profile.component";
import { TrainingDiaryComponent } from './modules/pages/trainingdiary/trainingdiary.component';
import { TrainingAxisComponent } from './modules/pages/trainingaxis/trainingaxis.component';
import { CompetitionsComponent } from './modules/pages/competitions/competitions.component';
import { EditCompetitionsComponent } from './modules/pages/editcompetitions/editcompetitions.component';
import { EditTrainingLogComponent } from './modules/pages/edittraininglog/edittraininglog.component';
import { EditTrainingShootComponent } from './modules/pages/edittrainingshoot/edittrainingshoot.component';

export const APP_ROUTES : Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'main', component: MainComponent, data: { cachable: false } },
    { path: 'profile', component: ProfileComponent, data: { cachable: false } },
    { path: 'profile/edittraininglog', component: EditTrainingLogComponent, data: { cachable: false } },
    { path: 'profile/editcompetitions', component: EditCompetitionsComponent, data: { cachable: false } },
    { path: 'profile/edittrainingshoot', component: EditTrainingShootComponent, data: { cachable: false } },
    { path: 'profile/competitions', component: CompetitionsComponent, data: { cachable: false } },
    { path: 'profile/training', component: TrainingAxisComponent, data: { cachable: false } },
    { path: 'profile/trainingdiary', component: TrainingDiaryComponent, data: { cachable: false } }
];
