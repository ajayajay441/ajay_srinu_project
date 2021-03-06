import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardpageComponent } from './dashboardpage/dashboardpage.component';
import { QuotationspageComponent } from './quotationspage/quotationspage.component';
import { ShipmentspageComponent } from './shipmentspage/shipmentspage.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardpageComponent
  },
  {
    path: 'shipments',
    component: ShipmentspageComponent
  },
  {
    path: 'quotes',
    component: QuotationspageComponent
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
