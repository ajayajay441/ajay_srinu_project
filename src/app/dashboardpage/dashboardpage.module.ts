import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardpageComponent } from './dashboardpage.component';
import { MapboxComponent } from './mapbox/mapbox.component';
import { QuotationcardComponent } from './quotationcard/quotationcard.component';
import { TodolistcardComponent } from './todolistcard/todolistcard.component';
import { ShipmentsComponent } from './shipments/shipments.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SchedulesComponent } from './schedules/schedules.component';

@NgModule({
  declarations: [
    DashboardpageComponent,
    MapboxComponent,
    QuotationcardComponent,
    TodolistcardComponent,
    ShipmentsComponent,
    PurchaseComponent,
    SchedulesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    FlexLayoutModule
  ],
  exports: [
    MapboxComponent
  ]
})
export class DashboardPageModule { }
