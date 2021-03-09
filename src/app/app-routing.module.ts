import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardpageComponent } from "./dashboardpage/dashboardpage.component";
import { EbookingpageComponent } from "./ebookingpage/ebookingpage.component";
import { QuotationspageComponent } from "./quotationspage/quotationspage.component";
import { ShipmentspageComponent } from "./shipmentspage/shipmentspage.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    component: DashboardpageComponent,
  },
  {
    path: "shipments",
    component: ShipmentspageComponent,
  },
  {
    path: "quotes",
    component: QuotationspageComponent,
  },

  {
    path: "po",
    component: EbookingpageComponent,
  },
  {
    path: "**",
    redirectTo: "/dashboard",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
