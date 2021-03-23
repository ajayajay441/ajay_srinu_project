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
    "qtno",
    "reference",
    "origin",
    "destination",
    "qtexpiry",
    "amount",
    "weight",
    "service",
    "status",
    "details",
  ];
  data: PeriodicElement[] = [
    {
      qtno: "US-DXB001",
      reference: "US-DXB001",
      origin: "America",
      destination: "Lyon",
      qtexpiry: "20/01/2021",
      amount: "AED 2000",
      weight: "2334 kg.",
      service: "FCL IMP",
      status: "Pending",
      details: "Details",
    },
    {
      qtno: "US-DXB001",
      reference: "US-DXB001",
      origin: "Brazil",
      destination: "Xyon",
      qtexpiry: "20/01/2021",
      amount: "AED 2000",
      weight: "2334 kg.",
      service: "FCL IMP",
      status: "Pending",
      details: "Details",
    },
    {
      qtno: "US-DXB001",
      reference: "US-DXB001",
      origin: "India",
      destination: "Fyon",
      qtexpiry: "20/01/2021",
      amount: "AED 2000",
      weight: "2334 kg.",
      service: "FCL IMP",
      status: "Pending",
      details: "Details",
    },
    {
      qtno: "US-DXB001",
      reference: "US-DXB001",
      origin: "South Africa",
      destination: "Ayon",
      qtexpiry: "20/01/2021",
      amount: "AED 2000",
      weight: "2334 kg.",
      service: "FCL IMP",
      status: "Pending",
      details: "Details",
    },
    {
      qtno: "US-DXB001",
      reference: "US-DXB001",
      origin: "West Indies",
      destination: "Ryon",
      qtexpiry: "20/01/2021",
      amount: "AED 2000",
      weight: "2334 kg.",
      service: "FCL IMP",
      status: "Pending",
      details: "Details",
    },
  ];
  dataSource = new MatTableDataSource(this.data);
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
        // this.loading = false;
        console.log("Quotation response", response.Quotation);
      });
  }
  getQuoteDetail(quoteNo?: any) {
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
    this.getQuoteDetail();
  }
}

export interface PeriodicElement {
  qtno: string;
  reference: string;
  origin: string;
  destination: string;
  qtexpiry: string;
  amount: string;
  weight: string;
  service: string;
  status: string;
  details: string;
  isExpanded?: boolean;
}
