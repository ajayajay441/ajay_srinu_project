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
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { DashboardService } from "../_services/dashboard.service";
import { Subscription } from "rxjs/index";
import { switchMap } from "rxjs/operators";
import { AuthenticationService } from "../_services";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { MatPaginator } from "@angular/material/paginator";
@Component({
  selector: "app-invoicepage",
  templateUrl: "./invoicepage.component.html",
  styleUrls: ["./invoicepage.component.scss"],
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
export class InvoicepageComponent implements OnInit {
  displayedColumns: string[] = [
    "inv_number",
    "inv_date",
    "house_no",
    "due_date",
    "days",
    "amount",
    "balance",
    "details",
  ];

  dataSource = new MatTableDataSource();
  expandedElement: PeriodicElement | null = null;
  loading = true;
  overDueAmount: any;
  totalDueAmount: any;
  unPaidInvoice: any;
  downloadLink: string = "";
  agingLink: string = "";
  activeScheduleStatusType: any = "PENDING";
  @ViewChild(MatSort)
  sort!: MatSort;
  invoiceTypes: any = [
    { label: "Pending", value: "pending" },
    { label: "Overdue", value: "overdue" },
    { label: "Paid", value: "paid" },
  ];
  activeInvoiceStatusType: any = "";
  quotationType = "pending"; // default selection
  filter: string = "";
  invoice_po: any;
  invoice_documents: any;
  modelChanged: Subject<string> = new Subject<string>();
  constructor(
    private http: HttpClient,
    private dashboardService: DashboardService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.modelChanged
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      // wait 300ms after the last event before emitting last event
      // only emit if value is different from previous value
      .subscribe((filter) => (this.filter = filter));
  }

  filterChanged(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  ngOnInit(): void {
    this.getDashboardInvoice();
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  invoiceData: any;
  getDashboardInvoice(value?: string) {
    console.log("how many times");
    if (value) this.activeInvoiceStatusType = value;
    this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData) => {
          return this.dashboardService.getDashboardInvoice(
            userData.Token,
            this.activeInvoiceStatusType,
            10
          );
        })
      )
      .subscribe((response: any) => {
        this.invoiceData = response["invoice-data"];
        this.dataSource = new MatTableDataSource(response["invoice-data"]);
        setTimeout(() => (this.dataSource.paginator = this.paginator));
        this.dataSource.sort = this.sort;
        this.overDueAmount = response.Over_Due;
        this.totalDueAmount = response.Total_Due;
        this.unPaidInvoice = response.UnpaidInvoice;
        this.loading = false;
        this.downloadLink = response.outstanding_link;
        this.agingLink = response.Ageing_Report_link;
        window.dispatchEvent(new Event("resize"));
        // console.log("Invoice Response", response["invoice-data"]);
      });
  }
  getinvoicedetail(sinvoice_no?: any) {
    this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData) => {
          return this.dashboardService.getinvoicedetail(
            userData.Token,
            sinvoice_no
          );
        })
      )
      .subscribe((response: any) => {
        this.invoice_po = response.invoicedetails.invoice_po;
        this.invoice_documents = response.invoicedetails.documents;
        console.log("Invoice Details Response", response);
      });
  }
}
export interface PeriodicElement {
  inv_number: string;
  amount: string;
  balance: string;
  currency: string;
  days: string;
  due_date: string;
  house_no: string;
  inv_date: string;
  details: string;
  isExpanded?: boolean;
}
