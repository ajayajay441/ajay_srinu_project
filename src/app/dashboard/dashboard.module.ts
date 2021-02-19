import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from './../app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard.component';
import { MapboxComponent } from './mapbox/mapbox.component';
import { QuotationcardComponent } from './quotationcard/quotationcard.component';
import { TodolistcardComponent } from './todolistcard/todolistcard.component';
import { ShipmentsComponent } from './shipments/shipments.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MapboxComponent,
    QuotationcardComponent,
    TodolistcardComponent,
    ShipmentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    FlexLayoutModule
  ]
})
export class DashboardModule { }
