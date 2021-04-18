import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DashboardService } from "../../_services/dashboard.service";
import { Subscription } from "rxjs/index";
import { Router } from "@angular/router";

import { switchMap } from "rxjs/operators";
import { AuthenticationService } from "../../_services";
@Component({
  selector: "app-purchase",
  templateUrl: "./purchase.component.html",
  styleUrls: ["./purchase.component.scss"],
})
export class PurchaseComponent implements OnInit {
  activePurchaseStatusType: any = "UPCOMING";
  data: any = [];
  error: any;
  loading = true;
  subscription: Subscription | undefined;
  constructor(
    private http: HttpClient,
    private dashboardService: DashboardService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDashboardPO();
  }

  getDashboardPO(value?: string) {
    // let status = "";
    // if (value == "Picked up POs") {
    //   status = "PICKED_UP";
    // } else if (value == "Upcoming POs") {
    //   status = "UPCOMING";
    // } else if (value == "Action Required") {
    //   status = "ACTION_REQUIRED";
    // }
    if (value) this.activePurchaseStatusType = value;
    this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData) => {
          return this.dashboardService.getDashboardPO(
            userData.Token,
            this.activePurchaseStatusType,
            2
          );
        })
      )
      .subscribe((response: any) => {
        this.data = response.PO;
        this.loading = false;
        // console.log("PO Response", response.PO);
      });
  }
  goTo(routePageName: string, data: any) {
    // console.log("data", data);
    this.router.navigate([`${routePageName}`]); // navigate to other page
  }
  onValChange(event: any): any {
    // console.log(event);
    alert(event);
  }
}
