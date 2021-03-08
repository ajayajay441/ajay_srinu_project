import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AppMaterialModule } from "../app-material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ShipmentspageComponent } from "./shipmentspage.component";
import { ActionsComponent } from "./actions/actions.component";

@NgModule({
  declarations: [ShipmentspageComponent, ActionsComponent],
  imports: [CommonModule, FormsModule, AppMaterialModule, FlexLayoutModule],
})
export class ShipmentspageModule {}
