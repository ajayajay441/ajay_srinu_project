import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { MatSort } from "@angular/material/sort";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { MatTableDataSource } from "@angular/material/table";
import { HttpClient } from "@angular/common/http";
import { DashboardService } from "../_services/dashboard.service";
import { Subscription } from "rxjs/index";
import { switchMap } from "rxjs/operators";
import { AuthenticationService } from "../_services";
@Component({
  selector: "app-quotationspage",
  templateUrl: "./quotationspage.component.html",
  styleUrls: ["./quotationspage.component.scss"],
})
export class QuotationspageComponent implements OnInit {
  quotationTypes: any = [
    { label: "Quotations", value: "quotations" },
    { label: "Contracts", value: "contracts" },
  ];
  quotationType = "quotations"; // default selection
  filter: string = "";
  modelChanged: Subject<string> = new Subject<string>();
  constructor(
    private http: HttpClient,
    private dashboardService: DashboardService,
    private authenticationService: AuthenticationService,
    private router: RouterModule
  ) {
    this.modelChanged
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      // wait 300ms after the last event before emitting last event
      // only emit if value is different from previous value
      .subscribe((filter) => (this.filter = filter));
  }

  filterChanged(filter: string) {
    this.modelChanged.next(filter);
  }

  ngOnInit(): void {}
}
