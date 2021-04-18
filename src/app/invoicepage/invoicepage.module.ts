import { NgModule } from "@angular/core";
import { InvoicepageComponent } from "./invoicepage.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AppMaterialModule } from "../app-material.module";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [InvoicepageComponent],
  imports: [CommonModule, FormsModule, AppMaterialModule, FlexLayoutModule],
})
export class InvoicepageModule {}
