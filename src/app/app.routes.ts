import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home/home.component';
import { InsertComponent } from './modules/home/insert/insert.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'insert',
        component: InsertComponent,
        pathMatch: 'full'
    },
    { path: '**', redirectTo: 'home' }
];
