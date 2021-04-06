import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
//modules
import { AppMaterialModule } from "./app-material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
// components
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { HttpClientModule } from "@angular/common/http";

// pages
import { DashboardPageModule } from "./dashboardpage/dashboardpage.module";
import { ShipmentspageModule } from "./shipmentspage/shipmentspage.module";
import { QuotationspageModule } from "./quotationspage/quotationspage.module";
import { EbookingpageModule } from "./ebookingpage/ebookingpage.module";
import { InvoicepageModule } from "./invoicepage/invoicepage.module";
import { PurchaseorderpageModule } from "./purchaseorderpage/purchaseorderpage.module";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    AppMaterialModule,
    FormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    HttpClientModule,
    DashboardPageModule,
    ShipmentspageModule,
    QuotationspageModule,
    EbookingpageModule,
    InvoicepageModule,
    PurchaseorderpageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
platformBrowserDynamic().bootstrapModule(AppModule);
