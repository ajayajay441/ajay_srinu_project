import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DashboardService } from "../_services/dashboard.service";
import { switchMap } from "rxjs/operators";
import { AuthenticationService } from "../_services";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboardpage.component.html",
  styleUrls: ["./dashboardpage.component.scss"],
})
export class DashboardpageComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDashboardShipments();
  }

  goTo(routePageName: string) {
    this.router.navigate([`${routePageName}`]); // navigate to other page
  }
  data: any;

  getDashboardShipments(value?: string) {
    // this.data = /,
    this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData: any) => {
          return this.dashboardService.getDashboardShipments(
            userData.Token,
            "",
            2
          );
        })
      )
      .subscribe((response: any) => {
        console.log("ship resp", response.Request_Quote_link);
        this.data = response.Request_Quote_link;
      });
  }
}
