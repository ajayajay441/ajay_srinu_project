import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DashboardService } from "../../_services/dashboard.service";
import { Subscription } from "rxjs/index";
import { switchMap } from "rxjs/operators";
import { AuthenticationService } from "../../_services";
@Component({
  selector: "app-schedules",
  templateUrl: "./schedules.component.html",
  styleUrls: ["./schedules.component.scss"],
})
export class SchedulesComponent implements OnInit {
  // scheduleType = "air";
  scheduleStatusTypes = [
    { label: "Air", value: "AIR" },
    { label: "Ocean", value: "OCEAN" },
  ];
  dataSource: any = [];
  error: any;
  loading = true;
  activeScheduleStatusType: any = "AIR";
  subscription: Subscription | undefined;
  constructor(
    private http: HttpClient,
    private dashboardService: DashboardService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getDashboardSailings();
  }

  getDashboardSailings(value?: string) {
    if (value) this.activeScheduleStatusType = value;
    this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData) => {
          return this.dashboardService.getDashboardSailings(
            userData.Token,
            this.activeScheduleStatusType,
            2
          );
        })
      )
      .subscribe((response: any) => {
        this.dataSource = response.schedules;
        this.loading = false;
        window.dispatchEvent(new Event("resize"));
        console.log("Schedule Response", response.schedules);
      });
  }
  onValChange(event: any): any {
    console.log(event);
  }
}
