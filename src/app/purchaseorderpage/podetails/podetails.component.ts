import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
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
import { switchMap } from "rxjs/operators";
import { AuthenticationService } from "../../_services";
// import { RouterModule } from "@angular/router";
import { Router } from "@angular/router";
import { AddskuComponent } from "../addsku/addsku.component";
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
  isChecked?: boolean;
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
  selector: "app-podetails",
  templateUrl: "./podetails.component.html",
  styleUrls: ["./podetails.component.scss"],
})
export class PodetailsComponent implements OnInit {
  dataSource = new MatTableDataSource();
  Request_Quote_link: any;
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
  poData: any;
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private dashboardService: DashboardService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.poData = this.router.getCurrentNavigation()?.extras.state;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddskuComponent, {
      width: "550px",
      height: "450px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }
  ngOnInit(): void {
    this.getpurchaseorderdetail();
  }
  getpurchaseorderdetail() {
    this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData) => {
          return this.dashboardService.getpurchaseorderdetail(
            userData.Token,
            this.poData
          );
        })
      )
      .subscribe((response: any) => {
        // console.log("PO details", response.PO_detail);
        // response.PO_detail = [
        //   {
        //     sku: "",
        //     description: "",
        //     shipmentno: "",
        //     delivery_date: "",
        //     Ordered: 5,
        //     booked: 4,
        //     closed: 2,
        //     balance: 3,
        //     actions: "",
        //   },
        //   {
        //     sku: "",
        //     description: "",
        //     shipmentno: "",
        //     delivery_date: "",
        //     Ordered: 5,
        //     booked: 4,
        //     closed: 2,
        //     balance: 5,
        //     actions: "",
        //   },
        // ];
        this.dataSource = new MatTableDataSource(response.PO_detail);
      });
  }
  goTo(routePageName: string, data: any) {
    // console.log("goTo::data", data.isError);
    if (data.isError) {
      return;
    }
    this.router.navigate([`${routePageName}`], {
      state: data,
    }); // navigate to other page
  }
  saveData(row: any) {
    // console.log("row", row);
  }
  balanceEdit(element: any, event: any) {
    if (Number(event.target.value) > Number(element.balance)) {
      alert("ERROR");
      event.target.value = element.balance;
    } else {
      element.balance = Number(event.target.value);
    }
  }
}
