import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DashboardService } from "../../_services/dashboard.service";
import { Subscription } from "rxjs/index";
import { switchMap } from "rxjs/operators";
import { AuthenticationService } from "../../_services";
@Component({
  selector: "app-todolistcard",
  templateUrl: "./todolistcard.component.html",
  styleUrls: ["./todolistcard.component.scss"],
})
export class TodolistcardComponent implements OnInit {
  test_checkbox = true;
  second_checkbox = false;
  checked = true;
  loading = true;
  data = [];
  error: any;
  subscription: Subscription | undefined;
  constructor(
    private http: HttpClient,
    private dashboardService: DashboardService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getDashboardThingsToDo();
  }

  getDashboardThingsToDo(value?: string) {
    this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData) => {
          return this.dashboardService.getDashboardThingsToDo(
            userData.Token,
            status,
            2
          );
        })
      )
      .subscribe((response: any) => {
        this.data = response.Thingstodo;
        this.loading = false;
        // console.log('Things TODO Response', response.Thingstodo);
      });
  }
}
