import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AppMaterialModule } from "../app-material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PurchaseorderpageComponent } from "./purchaseorderpage.component";
import { PodetailsComponent } from "./podetails/podetails.component";
import { AddskuComponent } from "./addsku/addsku.component";
@NgModule({
  declarations: [
    PurchaseorderpageComponent,
    PodetailsComponent,
    AddskuComponent,
  ],
  imports: [CommonModule, FormsModule, AppMaterialModule, FlexLayoutModule],
})
export class PurchaseorderpageModule {}
