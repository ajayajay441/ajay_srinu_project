import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ShipmentService } from "../_services/shipments.service";
import { Subscription } from "rxjs/index";
import { switchMap } from "rxjs/operators";
import { AuthenticationService } from "../_services";
import { DashboardService } from "../_services/dashboard.service";
import { toShortFormat } from "./../utilities";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
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
  currentPage: any;
  lastPage: any;
  filters: any = { status: [], mode: [] };
  sendto: string = "";
  modeVal: any = "";
  shipmentStatusTypes = [
    { label: "Booked", value: "BOOKED" },
    { label: "IN TRANSIT", value: "IN TRANSIT" },
    { label: "ARRIVED", value: "ARRIVED" },
  ];
  activeShipmentStatusType: any = "ARRIVED";
  shipmentFromDate: any;
  shipmentToDate: any;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private http: HttpClient,
    private shipmentService: ShipmentService,
    private authenticationService: AuthenticationService,
    private dashboardService: DashboardService
  ) {
    const d: any = new Date();
    d.setMonth(d.getMonth() - 6);
    this.shipmentFromDate = d;
    this.shipmentToDate = new Date();
    // console.log("Constructor");

    //flags

    this.matIconRegistry.addSvgIcon(
      "IN",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../../assets/icons/flags/IND.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "AE",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../../assets/icons/flags/AE.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "CN",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../../assets/icons/flags/Chaina.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "US",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../../assets/icons/flags/US.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "SG",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../../assets/icons/flags/SG.svg"
      )
    );
  }
  shipmentDetailSubscription: any;
  ngOnInit(): void {
    // console.log("OnInIt");
    this.getShipmentDetails();
    this.getdashboardfilter();
  }

  toggleShipmentDataView(shipment: any) {
    // console.log(shipment, "card expand or collapse");
  }
  getShipmentDetails(value?: string, page?: any, fromDate?: any, toDate?: any) {
    this.loading = true;
    let pageNo = page ? page : "1";
    // let status = "";
    if (value) this.activeShipmentStatusType = value;
    // this.loading = false;
    this.shipmentDetailSubscription = this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData) => {
          return this.shipmentService.getShipmentDetails(
            userData.Token,
            this.activeShipmentStatusType,
            pageNo,
            5,
            this.modeVal,
            fromDate
              ? toShortFormat(fromDate)
              : toShortFormat(this.shipmentFromDate),
            toDate ? toShortFormat(toDate) : toShortFormat(this.shipmentToDate)
          );
        })
      )
      .subscribe((response: any) => {
        this.data = response.ShipmentCard;
        this.currentPage = Number(response.currentPage);
        this.lastPage = Number(response.lastPage);

        this.loading = false;
        // console.log("Shipmentpage Response", response.ShipmentCard);
      });
  }
  // ngOnDestroy() {
  //   // console.log("Destroy");
  //   // this.shipmentDetailSubscription.unsubscribe();
  // }
  getdashboardfilter() {
    this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData) => {
          return this.shipmentService.getdashboardfilter(userData.Token);
        })
      )
      .subscribe((response: any) => {
        // console.log("Filter Values", response);
        this.filters = response;
      });
  }

  shipmentFromDateChange(shipmentFromDate: any) {
    console.log(toShortFormat(shipmentFromDate));
    if (this.shipmentToDate) {
      this.getShipmentDetails(
        this.activeShipmentStatusType,
        "1",
        shipmentFromDate,
        this.shipmentToDate
      );
    }
  }
  shipmentToDateChange(shipmentToDate: any) {
    if (this.shipmentToDate) {
      this.getShipmentDetails(
        this.activeShipmentStatusType,
        "1",
        this.shipmentFromDate,
        shipmentToDate
      );
    }
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
        // console.log("Shipmentpage Response", response);
      });
  }
  goTo(routePageName: string, data: any) {
    // console.log("data", data);
    this.router.navigate([`${routePageName}`]); // navigate to other page
  }
  seeMoreShipmentData(id: any) {
    // console.log(id);
    this.getShipmentTabDetails(id);
  }
  onModeChange(val: any) {
    this.modeVal = val;
    this.getShipmentDetails();
  }
  onStatusChange(val: any) {
    this.activeShipmentStatusType = val;
    this.getShipmentDetails();
  }
  onChangePage(page: any) {
    // console.log("page", page, this.sendto);
    let status = this.activeShipmentStatusType;
    this.loading = true;
    this.getShipmentDetails(status, page);
  }
}
