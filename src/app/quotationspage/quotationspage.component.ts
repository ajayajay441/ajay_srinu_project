import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";

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
}

const ELEMENT_DATA: PeriodicElement[] = [
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
@Component({
  selector: "app-quotationspage",
  templateUrl: "./quotationspage.component.html",
  styleUrls: ["./quotationspage.component.scss"],
})
export class QuotationspageComponent implements OnInit {
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
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort)
  sort!: MatSort;

  viewShipmentsType = "bookmarked";

  constructor(private router: Router) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  toggleShipmentDataView(shipment: any) {
    console.log(shipment, "card expand or collapse");
  }
}
