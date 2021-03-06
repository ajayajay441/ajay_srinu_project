import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { DashboardService } from "../../_services/dashboard.service";
import { Subscription } from "rxjs/index";
import { switchMap } from "rxjs/operators";
import { AuthenticationService } from "../../_services";
@Component({
  selector: "app-shipments",
  templateUrl: "./shipments.component.html",
  styleUrls: ["./shipments.component.scss"],
})
export class ShipmentsComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  shipmentType = "booked";
  shipmentStatusTypes = [
    { label: "Arriving", value: "ARRIVING" },
    { label: "Booked", value: "BOOKED" },
  ];
  activeShipmentStatusType: any = "ARRIVING";
  transitStatuses = [
    { label: "Booked", value: "BOOKED" },
    { label: "Cargo received", value: "RECEIVED" },
    { label: "Actual departed", value: "DEPARTED" },
    { label: "In transit", value: "IN TRANSIT" },
    { label: "ETA delayed", value: "DELAYED" },
    { label: "Actual arrived", value: "DELIVERED" },
  ];
  data: any = [];
  error: any;
  loading = true;
  subscription: Subscription | undefined;
  constructor(
    private dashboardService: DashboardService,
    private authenticationService: AuthenticationService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) {
    this.matIconRegistry.addSvgIcon(
      "fresconflight",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../../../assets/icons/fresconflight.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "fresconShip",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../../../assets/icons/ship.svg"
      )
    );
  }

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }

  ngOnInit(): void {
    this.getDashboardShipments();
  }

  goTo(routePageName: string, data: any) {
    // console.log("data", data);
    this.router.navigate([`${routePageName}`]); // navigate to other page
  }
  getDashboardShipments(value?: string) {
    if (value) this.activeShipmentStatusType = value;
    // console.log(this.activeShipmentStatusType);
    // this.data = /,
    this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData) => {
          return this.dashboardService.getDashboardShipments(
            userData.Token,
            this.activeShipmentStatusType,
            3
          );
        })
      )
      .subscribe((response: any) => {
        this.data = response.Shipments;
        this.newItemEvent.emit(response.Request_Quote_link);
        this.data.forEach((_data: any) => {
          _data.statusIndex = this.transitStatuses.findIndex(
            (s) => s.value === (_data["eta-flag"] ? "DELAYED" : _data.status)
          );
        });

        window.dispatchEvent(new Event("resize"));
        this.loading = false;
        console.log("ship resp", response.Shipments);
      });
  }
  truncate(str: any, n: any): any {
    if (str.length > n) {
      var string: any = str.substring(0, n - 1) + "...";
      return string;
    }
    return str;
  }
}
