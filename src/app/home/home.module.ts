import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './../home/components/home.component';
import { routing } from './../home/home.routing';
import { environment } from './../../environments/environment';
// Import angular2-fusioncharts
import { FusionChartsModule } from 'angular2-fusioncharts';

// Import FusionCharts library
import * as FusionCharts from 'fusioncharts';
// Import FusionCharts Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    FusionChartsModule.forRoot(FusionCharts, Charts)
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    
  ]
})
export class HomeModule { }