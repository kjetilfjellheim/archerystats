import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';

// Application components
import { StatisticsComponent }     from "./statistics/statistics.component";

export const APP_ROUTES : Routes = [
    { path: '', redirectTo: '/statistics', pathMatch: 'full' },
    { path: 'statistics', component: StatisticsComponent, data: { cachable: false } }
];
