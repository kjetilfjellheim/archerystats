import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';

// Application components
import { StatisticsComponent }     from "./statistics/statistics.component";
import { RankingComponent }           from "./ranking/ranking.component";
import { ScoringComponent }            from "./scoring/scoring.component";
import { PlayerComponent }            from "./player/player.component";

export const APP_ROUTES : Routes = [
    { path: '', redirectTo: '/rangering', pathMatch: 'full' },
    { path: 'rangering', component: RankingComponent, data: { cachable: false } },
    { path: 'statistikk', component: StatisticsComponent, data: { cachable: false } },
    { path: 'informasjon', component: ScoringComponent, data: { cachable: false } },
    { path: 'spillere', component: PlayerComponent, data: { cachable: false } }
];
