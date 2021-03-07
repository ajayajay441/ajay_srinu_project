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
  shipments = [];
  viewShipmentsType = "bookmarked";

  constructor(
    private router: Router,
    private http: HttpClient,
    private shipmentService: ShipmentService,
    private authenticationService: AuthenticationService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.getDashboardShipments();
  }

  toggleShipmentDataView(shipment: any) {
    console.log(shipment, "card expand or collapse");
  }
  // getShipmentDetails(value?:string) {
  //   let status='';
  //   // if(value=='Picked up POs'){
  //   //   status='PICKED_UP'
  //   // }else if(value=='Upcoming POs'){
  //   //   status='UPCOMING'
  //   // }else if(value=='Action Required'){
  //   //   status='ACTION_REQUIRED'
  //   // }
  //   this.authenticationService.refreshToken()
  //     .pipe(
  //       switchMap((userData) => {
  //         return this.shipmentService.getShipmentDetails(userData.Token,status);
  //       })
  //     ).subscribe((response:any) => {
  //     this.data = response.ShipmentCard;
  //     this.data.forEach(function (element:any) {
  //       element.seemore = false;
  //     });
  //     console.log("Shipmentpage Response",response.ShipmentCard);
  //   });
  // }
  getDashboardShipments(value?: string) {
    let status = "";
    if (value == "Bookmarked") {
      status = "BOOKMARK";
    } else if (value == "Arriving") {
      status = "ARRIVING";
    } else if (value == "Booked") {
      status = "BOOKED";
    }
    this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData) => {
          return this.dashboardService.getDashboardShipments(
            userData.Token,
            status,
            10
          );
        })
      )
      .subscribe((response: any) => {
        this.data = response.Shipments;
        // this.data.forEach(function (element:any) {
        //         element.seemore = false;
        //       });
        console.log("ship resp", response.Shipments);
      });
  }
}
