import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AppMaterialModule } from "../app-material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { QuotationspageComponent } from "./quotationspage.component";
import { QuotationslistComponent } from "./quotationslist/quotationslist.component";
import { ContractslistComponent } from "./contractslist/contractslist.component";
import { RejectquoteComponent } from "./rejectquote/rejectquote.component";

@NgModule({
  declarations: [
    QuotationspageComponent,
    QuotationslistComponent,
    ContractslistComponent,
    RejectquoteComponent,
  ],
  imports: [CommonModule, FormsModule, AppMaterialModule, FlexLayoutModule],
})
export class QuotationspageModule {}
