import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ShipmentService } from "../_services/shipments.service";
import { Subscription } from "rxjs/index";
import { switchMap } from "rxjs/operators";
import { AuthenticationService } from "../_services";
import { DashboardService } from "../_services/dashboard.service";

@Component({
  selector: "app-shipmentspage",
  templateUrl: "./shipmentspage.component.html",
  styleUrls: ["./shipmentspage.component.scss"],
})
export class ShipmentspageComponent implements OnInit {
  data: any = [{ "hbl-number": "400551000083", "customer-name": "SHANMU", "ponumber": "", "clearance-flag": "N", "boe-no": "BOEDEMO", "clr-no": "DDD", "latest-update": "This is only a booking information and subsequent milestones will be updated.", "origin": "MUMBAI", "ETD": "05-MAR-21", "destination": "DUBAI", "ETA": "09-MAR-21", "mode": "SEA", "pre_alert_document": " https://freightsystems.com/frescon_api/service.asmx/Document_Download?doc_uid=20210110030083&sl_no=1", "status": "IN TRANSIT", "eta-flag": "", seemore: true }, { "hbl-number": "DXB2100001", "customer-name": "SHANMU", "ponumber": "", "clearance-flag": "N", "boe-no": "BOEDEMO", "clr-no": "DDD", "latest-update": "Cargo Received Confirmation", "origin": "MUMBAI", "ETD": "05-MAR-21", "destination": "DUBAI", "ETA": "10-MAR-21", "mode": "SEA", "pre_alert_document": " https://freightsystems.com/frescon_api/service.asmx/Document_Download?doc_uid=20210110030083&sl_no=1", "status": "IN TRANSIT", "eta-flag": "" }];;
  cargo: any = [];
  shipments = [];
  viewShipmentsType = "bookmarked";

  constructor(
    private router: Router,
    private http: HttpClient,
    private shipmentService: ShipmentService,
    private authenticationService: AuthenticationService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    // this.getDashboardShipments();
    this.getShipmentDetails();
  }

  toggleShipmentDataView(shipment: any) {
    console.log(shipment, "card expand or collapse");
  }
  getShipmentDetails(value?: string) {
    let status = "";
    this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData) => {
          return this.shipmentService.getShipmentDetails(
            userData.Token,
            status
          );
        })
      )
      .subscribe((response: any) => {
        this.data = response.ShipmentCard;
        this.data.forEach(function (element: any) {
          element.seemore = false;
        });
        console.log("Shipmentpage Response", response.ShipmentCard);
      });
  }

  seeMoreShipmentData(id: any) {
    console.log(id);
  }
  getDashboardShipments(value?: string) {
    // this.authenticationService
    //   .refreshToken()
    //   .pipe(
    //     switchMap((userData) => {
    //       return this.dashboardService.getDashboardShipments(
    //         userData.Token,
    //         status,
    //         10
    //       );
    //     })
    //   )
    //   .subscribe((response: any) => {
    //     this.data = response.Shipments;
    //     // this.data.forEach(function (element:any) {
    //     //         element.seemore = false;
    //     //       });
    //     console.log("ship resp", response.Shipments);
    //   });
  }
}
