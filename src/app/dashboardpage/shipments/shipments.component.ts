import { Component, OnInit } from "@angular/core";
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
        // this.data = response.Shipments;
        this.data = [
          {
            "hbl-number": "HBL #120831000016",
            "customer-name": "SEW-EURODRIVE INDIA PVT. LTD. (CHENNAI)",
            ponumber: "7845896",
            "clearance-flag": "N",
            "boe-no": "BOEDEMO",
            "clr-no": "DDD",
            "latest-update": "Cargo received for loading",
            origin: "CHENNAI",
            ETD: "06-APR-21",
            destination: "MUMBAI",
            ETA: "17-APR-21",
            mode: "SEA",
            pre_alert_document:
              "https://freightsystems.com/frescon_api/service.asmx/Document_Download?doc_uid=20210110030083&sl_no=1",
            status: "IN TRANSIT",
            booking_no: "120831000016",
            segment_code: "04",
            company_code: "FSL",
            "eta-flag": "YES",
            updates: [
              {
                remarks_date: "04/06/2021",
                remarks_description: "DOCUMENTS ARE NOT READY FOR CLEARANCE",
              },
              {
                remarks_date: "04/06/2021",
                remarks_description:
                  "This is only a booking information and subsequent milestones will be updated.",
              },
              {
                remarks_date: "04/06/2021",
                remarks_description: "Cargo received for loading",
              },
            ],
          },
          {
            "hbl-number": "HBL #400551000070",
            "customer-name": "SEW-EURODRIVE INDIA PVT. LTD. (CHENNAI)",
            ponumber: "",
            "clearance-flag": "N",
            "boe-no": "BOEDEMO",
            "clr-no": "DDD",
            "latest-update": "Cargo Received Confirmation",
            origin: "MUMBAI",
            ETD: "14-APR-21",
            destination: "CHENNAI",
            ETA: "16-APR-21",
            mode: "AIR",
            pre_alert_document:
              "https://freightsystems.com/frescon_api/service.asmx/Document_Download?doc_uid=20210110030083&sl_no=1",
            status: "DELIVERED",
            booking_no: "400551000070",
            segment_code: "12",
            company_code: "ACGL",
            "eta-flag": "",
            updates: [
              {
                remarks_date: "02/08/2021",
                remarks_description: "Cargo Received Confirmation",
              },
              {
                remarks_date: "02/08/2021",
                remarks_description:
                  "This is only a booking information and subsequent milestones will be updated.",
              },
            ],
          },
          {
            "hbl-number": "HBL #120811000003",
            "customer-name": "SEW-EURODRIVE INDIA PVT. LTD. (CHENNAI)",
            ponumber: "",
            "clearance-flag": "N",
            "boe-no": "BOEDEMO",
            "clr-no": "DDD",
            "latest-update": "Cargo received for loading",
            origin: "CHENNAI",
            ETD: "18-MAR-21",
            destination: "MUMBAI",
            ETA: "30-MAR-21",
            mode: "SEA",
            pre_alert_document:
              "https://freightsystems.com/frescon_api/service.asmx/Document_Download?doc_uid=20210110030083&sl_no=1",
            status: "IN TRANSIT",
            booking_no: "120811000003",
            segment_code: "01",
            company_code: "FSL",
            "eta-flag": "YES",
            updates: [
              {
                remarks_date: "03/18/2021",
                remarks_description: "DOCUMENTS ARE NOT READY FOR CLEARANCE",
              },
              {
                remarks_date: "03/18/2021",
                remarks_description: "Cargo received for loading",
              },
            ],
          },
        ];
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
}
