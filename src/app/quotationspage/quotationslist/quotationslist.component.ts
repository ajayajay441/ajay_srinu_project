import { Component, Input, OnInit, ViewChild } from "@angular/core";
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
import { DashboardService } from "../../_services/dashboard.service";
import { Subscription } from "rxjs/index";
import { Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { AuthenticationService } from "../../_services";
import { MatPaginator } from "@angular/material/paginator";
@Component({
  selector: "app-quotationslist",
  templateUrl: "./quotationslist.component.html",
  styleUrls: ["./quotationslist.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class QuotationslistComponent implements OnInit {
  @Input() filter: string;
  @Input() data: any;
  displayedColumns: string[] = [
    "quotation-number",
    "weight",
    "origin",
    "destination",
    "reference-number",
    "expiry_date",
    "service",
    "amount",
    "status",
    "details",
  ];

  dataSource = new MatTableDataSource();
  expandedElement: PeriodicElement | null = null;
  po: any;
  documents: any;

  loading = true;
  constructor(
    private http: HttpClient,
    private dashboardService: DashboardService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.filter = "";
    // console.log("... a new instance of LandComponent has been created");
  }

  ngOnChanges(changes: any) {
    const filterValue = changes.filter.currentValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getQuoteDetail(quoteNo: any) {
    this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData) => {
          return this.dashboardService.getQuoteDetail(userData.Token, quoteNo);
        })
      )
      .subscribe((response: any) => {
        // console.log("Quote Details response", response.quotedetails);
        this.po = response.quotedetails[0].po;
        this.documents = response.quotedetails[0].documents;
      });
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    setTimeout(() => (this.dataSource.paginator = this.paginator));
    setTimeout(() => (this.dataSource.sort = this.sort));
  }
}

export interface PeriodicElement {
  amount: string;
  currecy_code: string;
  customer_name: string;
  destination: string;
  expiry_date: string;
  origin: string;
  places: string;
  "quotation-number": string;
  "reference-number": string;
  service: string;
  type: string;
  volume: string;
  weight: string;
  details: string;
  status: string;
  isExpanded?: boolean;
}
