import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AppMaterialModule } from "../app-material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ShipmentspageComponent } from "./shipmentspage.component";
import { ShipmentmapviewComponent } from "./shipmentmapview/shipmentmapview.component";
import { ActionsComponent } from "./actions/actions.component";
import { DocumentsComponent } from "./documents/documents.component";
import { CANComponent } from "./can/can.component";
import { ShipmentactivityComponent } from "./shipmentactivity/shipmentactivity.component";
import { DashboardPageModule } from "../dashboardpage/dashboardpage.module";
import { CargodetailsComponent } from "./cargodetails/cargodetails.component";
import { PaginatorComponent } from "@app/paginator/paginator.component";

@NgModule({
  declarations: [
    ShipmentspageComponent,
    ActionsComponent,
    DocumentsComponent,
    CANComponent,
    ShipmentmapviewComponent,
    ShipmentactivityComponent,
    CargodetailsComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    FlexLayoutModule,
    DashboardPageModule,
  ],
})
export class ShipmentspageModule { }
