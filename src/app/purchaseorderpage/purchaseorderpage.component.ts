import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
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
// import { RouterModule } from "@angular/router";
import { Router } from "@angular/router";
export interface PeriodicElement {
  Ordered: number;
  balance: number;
  booked: number;
  closed: number;
  delivery_date: string;
  description: string;
  po_number: string;
  shipmentno: string;
  sku: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    Ordered: 5,
    balance: 2,
    booked: 4,
    closed: 3,
    delivery_date: "13-FEB-21",
    description: "ITEM1 Description",
    po_number: "115422",
    shipmentno: "238907954",
    sku: "ITEM1",
  },
];

@Component({
  selector: "app-purchaseorderpage",
  templateUrl: "./purchaseorderpage.component.html",
  styleUrls: ["./purchaseorderpage.component.scss"],
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
export class PurchaseorderpageComponent implements OnInit {
  data: any;
  displayedColumns: string[] = [
    "sku",
    "description",
    "shipmentno",
    "delivery_date",
    "Ordered",
    "booked",
    "closed",
    "balance",
    "actions",
  ];
  dataSource = new MatTableDataSource();
  displayedColumns1: string[] = [
    "PO No",
    "Origin",
    "Destination",
    "Supplier",
    "Number of SKU’s",
    "Order Pcs",
    "In Transit",
    "Closed",
    "details",
  ];
  // ELEMENT_DATA1: PeriodicElement1[] = [
  //   {
  //     "reference-number": "FSL-98001",
  //     valid_from: "Jan 1, 2021",
  //     expiry_date: "Jan 1, 2021",
  //     approved_by: "SHANMU",
  //     details: "Details",
  //   },
  // ];
  Request_Quote_link: any;
  dataSource1 = new MatTableDataSource();
  expandedElement: PeriodicElement1 | null = null;
  constructor(
    private http: HttpClient,
    private dashboardService: DashboardService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.getpurchaseorder();
  }
  getpurchaseorder(value?: string) {
    let status = "";
    this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData) => {
          return this.dashboardService.getpurchaseorder(
            userData.Token,
            status,
            ""
          );
        })
      )
      .subscribe((response: any) => {
        // this.data = response.Quotation;
        // // this.loading = false;
        // this.loading = false;
        console.log("PO Page response", response);
        this.dataSource1 = new MatTableDataSource(response.purchase_order);
      });
  }
  getpurchaseorderdetail(value?: string) {
    this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData) => {
          return this.dashboardService.getpurchaseorderdetail(
            userData.Token,
            value
          );
        })
      )
      .subscribe((response: any) => {
        console.log("PO details", response.PO_detail);
        this.dataSource = new MatTableDataSource(response.PO_detail);
        this.Request_Quote_link = response.Request_Quote_link;
      });
  }
  goTo(routePageName: string, data: any) {
    console.log("data", data);
    this.router.navigate([`${routePageName}`]); // navigate to other page
  }
  saveData(row: any) {
    console.log("row", row);
  }
}
export interface PeriodicElement1 {
  po_number: string;
  origin: string;
  destination: string;
  supplier: string;
  no_of_sku: number;
  orderpieces: number;
  intransit: number;
  closed: number;
  isExpanded?: boolean;
}
