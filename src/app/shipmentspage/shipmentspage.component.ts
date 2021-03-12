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
  data: any = [];
  cargo: any;
  documents: any;
  updates: any;
  CAN: any;
  shipments = [];
  tabdata: any = [];
  viewShipmentsType = "bookmarked";
  loading: boolean = true;

  constructor(
    private router: Router,
    private http: HttpClient,
    private shipmentService: ShipmentService,
    private authenticationService: AuthenticationService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
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
        this.loading = false;
        console.log("Shipmentpage Response", response.ShipmentCard);
      });
  }

  getShipmentTabDetails(id?: any) {
    let status = "";
    let booking_no = id.booking_number;
    let company_code = id.company_code;
    let segment_code = id.segment_code;
    this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData) => {
          return this.shipmentService.getShipmentTabsData(
            userData.Token,
            status,
            booking_no,
            company_code,
            segment_code
          );
        })
      )
      .subscribe((response: any) => {
        this.cargo = response.cargo_details;
        this.documents = response.documents;
        this.updates = response.updates;
        this.CAN = response.CAN;
        // this.data.forEach(function (element: any) {
        //   element.seemore = false;
        // });
        console.log("Shipmentpage Response", response);
      });
  }
  seeMoreShipmentData(id: any) {
    console.log(id);
    this.getShipmentTabDetails(id);
  }
}
