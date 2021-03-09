import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AppMaterialModule } from "../app-material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ShipmentspageComponent } from "./shipmentspage.component";
import { ShipmentmapviewComponent } from "./shipmentmapview/shipmentmapview.component";
import { ActionsComponent } from "./actions/actions.component";
import { ShipmentactivityComponent } from "./shipmentactivity/shipmentactivity.component";
// import { MapboxComponent } from "../dashboardpage/mapbox/mapbox.component";
import { DashboardPageModule } from "../dashboardpage/dashboardpage.module";

@NgModule({
  declarations: [
    ShipmentspageComponent,
    ActionsComponent,
    ShipmentmapviewComponent,
    ShipmentactivityComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    FlexLayoutModule,
    DashboardPageModule
  ],
})
export class ShipmentspageModule { }
