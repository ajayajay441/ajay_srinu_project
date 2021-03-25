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
  data: PeriodicElement[] = [
    // {
    //   amount: "US-DXB001",
    //   currecy_code: "AED",
    //   customer_name: "SHANMU",
    //   destination: "MUMBAI",
    //   expiry_date: "10/11/2020",
    //   origin: "CHENNAI",
    //   places: "CHENNAI",
    //   "quotation-number": "2012080074",
    //   "reference-number": "2012080074",
    //   service: "SEA",
    //   type: "FCL",
    //   volume: "1250000",
    //   weight: "500",
    //   status: "",
    //   details: "Details",
    // },
  ];
  dataSource = new MatTableDataSource();
  expandedElement: PeriodicElement | null = null;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private http: HttpClient,
    private dashboardService: DashboardService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.filter = "";
  }

  ngOnChanges(changes: any) {
    const filterValue = changes.filter.currentValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getDashboardQuotation(value?: string) {
    let status = "";
    if (value == "Review Quote") {
      status = "REVIEW_QUOTES";
    } else if (value == "Approved Quote") {
      status = "APPROVED_QUOTES";
    } else if (value == "Enquiry") {
      status = "ENQUIRY";
    }
    this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData) => {
          return this.dashboardService.getDashboardQuotation(userData.Token);
        })
      )
      .subscribe((response: any) => {
        this.data = response.Quotation;
        this.dataSource = new MatTableDataSource(response.Quotation);
        // this.loading = false;
        console.log("Quotation response", response.Quotation);
      });
  }
  getQuoteDetail(quoteNo: any) {
    this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData) => {
          return this.dashboardService.getQuoteDetail(
            userData.Token,
            "2040050155"
          );
        })
      )
      .subscribe((response: any) => {
        this.data = response.Quotation;
        // this.loading = false;
        console.log("Quote Details response", response.quotedetails);
      });
  }
  ngOnInit(): void {
    this.getDashboardQuotation();
    // this.getQuoteDetail();
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
