import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './../home/components/home.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: null }
];

export const routing: ModuleWithProviders = RouterModule.forChild(appRoutes);